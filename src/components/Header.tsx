import { getSession } from "@/lib/server/authz";
import HeaderChrome from "@/components/HeaderChrome";

export default async function Header() {
  const session = await getSession();
  return <HeaderChrome signedIn={Boolean(session)} />;
}
