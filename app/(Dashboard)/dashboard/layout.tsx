import ProtectedRoute from '@components/auth/ProtectedRoute';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // return <ProtectedRoute plan={['standard', 'plus', 'premium']}>{children}</ProtectedRoute>;
  return children;
};

export default Layout;
