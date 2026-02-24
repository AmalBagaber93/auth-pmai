import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies();
  const vid = cookieStore.get('auth_vid');

  if (!vid) {
    redirect('/login');
  }

  return { children }
}


