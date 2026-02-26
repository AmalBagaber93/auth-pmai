import { getUserServer } from "@/api/auth/server/get-user";

import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const userDetailsData = await getUserServer();

  if (userDetailsData) {
    redirect('/dashboard');
  
  }
  return <>{children}</>;
}


