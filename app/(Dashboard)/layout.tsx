"use client";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import Dashboard from "@components/Dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // @ts-ignore
    <ProtectedRoute plan={["free", "standard", "plus", "premium"]}>
      <div className="flex min-h-screen overflow-x-hidden bg-slate-100/80 mt-20">
        <Dashboard />
        <div className=" w-full">{children}</div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
