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
          <img
            src="https://logohistory.net/wp-content/uploads/2023/07/Ralph-Lauren-Logo.png"
            alt="Ralph Lauren Logo"
          />
        </div>
        <div className="left-navbar">
          <ul className="nav-links">
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate("/products")}>Products</a>
            </li>
            <li>
              <a onClick={() => navigate("/product-create")}>About</a>
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
          <FavoriteBorderIcon />
          <ShoppingBagIcon />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
