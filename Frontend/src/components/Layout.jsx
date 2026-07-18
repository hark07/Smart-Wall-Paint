import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Layout;