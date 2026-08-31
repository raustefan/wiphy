import { auth } from "@/auth";
import HeaderChrome from "@/components/HeaderChrome";

export default async function Header() {
  const session = await auth();
  return <HeaderChrome signedIn={Boolean(session)} />;
}
