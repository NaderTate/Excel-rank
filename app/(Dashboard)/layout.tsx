"use client";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import DashboardNav from "../components/Navbar/DashboardNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // @ts-ignore
    <ProtectedRoute plan={["free", "standard", "plus", "premium"]}>
      <div className="">
        <DashboardNav />
        <div className=" w-full">{children}</div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
