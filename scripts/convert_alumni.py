#!/usr/bin/env python3
"""
Wandelt den phpMyAdmin-Export der alten Alumni-Datenbank (alumni.json) in das
Format des JSON-Massenimports (/dashboard/users/new, siehe importFormat.ts).

    python3 scripts/convert_alumni.py [alumni.json] [alumni-import.json]

Bewusst nicht übernommen (Datensparsamkeit, kein Feld im neuen Schema):
Passwort-Hash (MD5), Login-Name, Foto, Geschlecht, Fax, Geschäftsadresse,
Webseite, Diplomarbeit/Dissertation/Praktika/Hobbies usw., alte BLZ/Kto.
"""

import json
import re
import sys
from datetime import date

THIS_YEAR = date.today().year
# Wer heute Student ist, gilt auch so viele Jahre nach dem laufenden noch als Student
# (Formular erlaubt bis zu STUDENT_YEAR_LOOKAHEAD = 5, src/lib/membership.ts)
STUDENT_EXTRA_YEARS = 5
PHONE = re.compile(r"^\+?[\d\s()/.-]{5,30}$")  # wie isValidPhone in src/lib/inputRules.ts
COUNTRY_ALIASES = {"USA": "US"}  # Rest löst toCountryCode() serverseitig auf


def text(value):
    value = (value or "").strip()
    return value or None


def day(value):
    """'0000-00-00' ist MySQLs „kein Datum“."""
    value = text(value)
    return None if not value or value.startswith("0000") else value


def phone(row):
    for key in ("Mobil", "Tel1", "Tel2"):
        value = text(row[key])
        if value and PHONE.match(value) and sum(c.isdigit() for c in value) >= 5:
            return value
    return None


def admin_note(row):
    lines = [text(row["Bem"])]
    lines.append(f"Altsystem: Beitrag {row['Betrag']} €/Jahr")
    if row["Zuwendungsbesch"] == "ja":
        lines.append("Altsystem: Zuwendungsbestätigung gewünscht")
    if row["Datensperren"] == "ja":
        lines.append("Altsystem: Datensperre")
    if row["Bankeinzug"] == "ja" and row["SequenceType"] == "FRST":
        lines.append("Altsystem: noch keine Lastschrift eingezogen (FRST)")
    return "\n".join(line for line in lines if line)


def convert(row):
    regular = row["Status"] == "Ordentliches Mitglied"
    status = "REGULAR_MEMBER" if regular else "HONORARY_MEMBER" if row["Status"] == "Ehrenmitglied" else "NON_MEMBER"
    joined = day(row["Aufnahme"])
    # Altsystem kennt nur den heutigen Berufsstand: wer Student ist, war es die ganze Mitgliedschaft
    student = joined and row["Berufsstand"] == "Student"
    student_years = list(range(int(joined[:4]), THIS_YEAR + 1 + STUDENT_EXTRA_YEARS)) if student else []
    debit = row["Bankeinzug"] == "ja" and bool(text(row["IBAN"]))
    start, end = text(row["Studienbeginn"]), text(row["Studienende"])
    land = text(row["Land"])
    birth = day(row["Gebdatum"])
    if birth and birth < "1900":  # Schema lehnt ab (Ehrenmitglied Einstein, 1879)
        birth = None

    entry = {
        "email": row["Email"].strip(),
        # ponytail: Admin-Rechte nie automatisch übernehmen, siehe Warnung unten
        "role": "MEMBER",
        "firstName": row["Vorname"].strip(),
        "lastName": row["Name"].strip(),
        "title": text(row["Titel"]),
        "birthDate": birth,
        "phone": phone(row),
        "addressLine1": text(row["Strasse"]),
        "addressLine2": text(row["Adresszusatz"]),
        "postalCode": text(row["PLZ"]),
        "city": text(row["Ort"]),
        "region": None,
        "countryCode": COUNTRY_ALIASES.get(land, land),
        "memberNumber": int(row["ID"]),
        "joinedAt": joined,
        "status": status,
        "studentYears": student_years,
        "adminNote": admin_note(row),
        "degreeProgram": text(row["Studiengang"]),
        # Altsystem kennt nur Jahre: Wintersemester-Beginn bzw. Ende Sommersemester
        "studyStart": f"{start}-10-01" if start else None,
        "studyEnd": f"{end}-09-30" if end else None,
        "employer": text(row["AktuellerArbeitgeber"]),
        "employmentStatus": text(row["Berufsstand"]),
        "industry": text(row["Berufszweig"]),
        "jobTitle": text(row["Position"]),
        "linkedinUrl": None,
        "directDebit": debit,
        "accountHolder": None,
        "iban": text(row["IBAN"]) if debit else None,
        "bic": text(row["BIC"]) if debit else None,
        # Referenz wie im Altsystem, damit bestehende Mandate weiterlaufen
        "mandateReference": f"ID{row['ID']}-Mandat{row['MandatCounter']}" if debit else None,
        "mandateSignedAt": day(row["Mandatserteilung"]) if debit else None,
        "loginDisabled": row["Ausschluss"] == "ja",
        # Zahlstand manuell geprüft: alles bis einschließlich laufendes Jahr bezahlt.
        # Künftige Studienjahre legt die App aus studentYears offen an.
        # Schema erlaubt allPaid nur für ordentliche Mitglieder mit Beitritt.
        "allPaid": bool(regular and joined),
        "fees": None,
    }
    return entry


def main():
    source = sys.argv[1] if len(sys.argv) > 1 else "alumni.json"
    target = sys.argv[2] if len(sys.argv) > 2 else "alumni-import.json"
    export = json.load(open(source, encoding="utf-8"))
    rows = next(t["data"] for t in export if t.get("type") == "table" and t["name"] == "alumni")

    entries = [convert(row) for row in rows]
    with open(target, "w", encoding="utf-8") as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)
    print(f"{len(entries)} Einträge → {target}", file=sys.stderr)

    admins = [f"{r['Vorname']} {r['Name']} (ID {r['ID']})" for r in rows if r["Rechte"] == "admin"]
    if admins:
        print("Im Altsystem Admin, als MEMBER importiert:\n  " + "\n  ".join(admins), file=sys.stderr)
    unknown = {r["Status"] for r in rows} - {"Ordentliches Mitglied", "Ehrenmitglied"}
    if unknown:
        print(f"Unbekannter Status → NON_MEMBER: {', '.join(sorted(unknown))}", file=sys.stderr)


if __name__ == "__main__":
    main()
