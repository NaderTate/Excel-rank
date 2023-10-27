import ProtectedRoute from "@components/auth/ProtectedRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ProtectedRoute plan={['standard', 'plus', 'premium']}>
    <div>{children}</div>
    //  </ProtectedRoute>;
  );
};

export default Layout;
