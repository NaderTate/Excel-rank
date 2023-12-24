import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import DashboardNav from "@/components/Dashboard/DashboardNavbar";

import { authOptions } from "@/lib/authOptions";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <DashboardNav />
      <div className=" w-full">{children}</div>
    </>
  );
};

export default Layout;
