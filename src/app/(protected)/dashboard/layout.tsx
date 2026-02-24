import { getUserServer } from "@/api/auth/server/get-user";
import { DashboardLayout } from "@/components/layout/dashboard/dashboard-layout";

import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const userDetailsData = await getUserServer();

  if (!userDetailsData) {
    console.log('no login')
    redirect('/login');
  }
  console.log(userDetailsData)
  return <DashboardLayout>{children}</DashboardLayout>;
}


