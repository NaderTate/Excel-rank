import Footer from "../Footer";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
