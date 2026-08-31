-- Normalizes every stored email address to lowercase.
--
-- "User"."email" is a case-SENSITIVE unique column, but the application was
-- inconsistent: registration stored the address as typed, while password reset
-- and verification-resend looked it up lowercased. Those users could never
-- recover their account. From here on the app lowercases on write, so the
-- existing rows have to be brought in line.
--
-- If two accounts differ only by case, lowercasing them would violate the unique
-- constraint. Rather than silently picking a winner (which loses member data),
-- this migration aborts and names the addresses so they can be merged by hand.
DO $$
DECLARE
    collisions TEXT;
BEGIN
    SELECT string_agg(dup.lowered, ', ' ORDER BY dup.lowered)
    INTO collisions
    FROM (
        SELECT lower(email) AS lowered
        FROM "User"
        GROUP BY lower(email)
        HAVING count(*) > 1
    ) AS dup;

    IF collisions IS NOT NULL THEN
        RAISE EXCEPTION
            'Cannot normalize emails to lowercase: these addresses exist under multiple casings and must be merged manually first: %',
            collisions;
    END IF;
END $$;

UPDATE "User" SET "email" = lower("email") WHERE "email" <> lower("email");
UPDATE "PasswordResetToken" SET "email" = lower("email") WHERE "email" <> lower("email");
UPDATE "EmailVerificationToken" SET "email" = lower("email") WHERE "email" <> lower("email");
