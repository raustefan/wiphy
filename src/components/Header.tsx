import { getSession } from "@/lib/server/authz";
import { getDisabledPages } from "@/lib/server/services/featureFlagService";
import HeaderChrome from "@/components/HeaderChrome";

export default async function Header() {
  const [session, hiddenPaths] = await Promise.all([getSession(), getDisabledPages()]);
  return <HeaderChrome signedIn={Boolean(session)} hiddenPaths={hiddenPaths} />;
}
