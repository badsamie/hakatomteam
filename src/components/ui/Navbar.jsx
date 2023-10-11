import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/")}>Samagan</button>
      <button onClick={() => navigate("/sabina")}>Sabina</button>
      <button onClick={() => navigate("/aisuluu")}>Aisuluu</button>
    </>
  );
};

export default Navbar;
