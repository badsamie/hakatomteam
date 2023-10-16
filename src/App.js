import React from "react";
import Navbar from "./components/ui/Navbar";
import MainRoutes from "./routing/MainRoutes";
import Footer from "./components/ui/Footer";


const App = () => {
  return (
    <>
      <Navbar />
      <MainRoutes />
      <Footer />
    </>
  );
};

export default App;
