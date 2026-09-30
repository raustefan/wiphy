import { redirect } from "next/navigation";

/** Die Beitragsübersicht ist in der Benutzerverwaltung aufgegangen. */
export default async function FeesRedirect({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year } = await searchParams;
  redirect(year ? `/dashboard/users?year=${encodeURIComponent(year)}` : "/dashboard/users");
}
