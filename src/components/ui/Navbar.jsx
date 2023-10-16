import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./Navbar.css";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { logout, checkUserLogin } from "../../helpers/functions";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={scrolled ? "navbar scrolled" : "navbar"}>
        <div className="logo">
          <a>Ralph Lauren</a>
        </div>
        <div className="left-navbar">
          <ul className="nav-links text-light">
          <li>
  <a onClick={() => navigate("/")} className="text-light">
    Home
  </a>
</li>


            <li className="group relative">
              <a onClick={() => navigate("/products")}>Products</a>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition ease-in-out duration-200  ">
                {/* <a href="#sublink1" onClick={() => navigate("/product1")} className="text-light lowercase">
                  Subproduct 1
                </a> */}
                <p className="text-light lowercase">men</p>
                <hr />
                <p className="text-light lowercase ">women</p>
                <hr />
                <p>kids</p>
                {/* <a href="#sublink2" onClick={() => navigate("/product2")}>
                  Subproduct 2
                </a> */}
              </div>
            </li>
            <li>
              <a onClick={() => navigate("/product-create")}>create</a>

            </li>
          </ul>
        </div>
        <div className="right-navbar">
          <SearchIcon onClick={() => navigate("")} />
          {checkUserLogin() ? (
            <PersonOffIcon
              onClick={() => {
                logout();
                navigate("/");
              }}
            />
          ) : (
            <PermIdentityIcon onClick={() => navigate("/register")} />
          )}
          {checkUserLogin() ? (
            <ShoppingBagIcon onClick={() => navigate("/cart")} />
          ) : (
            <PermIdentityIcon onClick={() => navigate("/register")} />
          )}

          <FavoriteBorderIcon />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
