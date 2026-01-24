import { Outlet } from "react-router-dom";
import Navbar from "../assets/components/Navbar/Navbar";
import Footer from "../assets/components/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
