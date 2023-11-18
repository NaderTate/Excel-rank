import Footer from "../Footer";
import Navbar from "../components/Navbar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
