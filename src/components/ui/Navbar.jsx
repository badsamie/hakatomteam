import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./Navbar.css";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { logout, checkUserLogin } from "../../helpers/functions";
import MicIcon from "@mui/icons-material/Mic";
import { useDispatch, useSelector } from "react-redux";
import { setSearchVal } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  // !--------------------------voice
  const { search } = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState("");
  const dispactch = useDispatch();

  const [recognizedText, setRecognizedText] = useState("");
  const handleVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
    };
    recognition.start();
  };

  useEffect(() => {
    if (!search) {
      setSearchValue("");
    }
  }, [search]);
  const handleInputChange = (value) => {
    setSearchValue(value);
  };
  useEffect(() => {
    // Устанавливаем recognizedText как начальное значение в поле ввода
    setSearchValue(recognizedText);
  }, [recognizedText]);
  // !--------------------------voice

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
          <a>ＲＡＬＰＨ ＬＡＵＲＥＮ</a>
        </div>
        <div className="left-navbar">
          <ul className="nav-links text-light">
            <li>
              <a onClick={() => navigate("/")} className="text-light">
                Ｈｏｍｅ
              </a>
            </li>

            <li className="group relative">
              <a onClick={() => navigate("/products")}>Ｐｒｏｄｕｃｔｓ</a>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition ease-in-out duration-200  ">
                <p className="text-light lowercase">men</p>
                <hr />
                <p className="text-light lowercase ">women</p>
                <hr />
                <p>kids</p>
              </div>
            </li>

            {checkUserLogin() && (
              <li>
                <a onClick={() => navigate("/product-create")}>Ｃｒｅａｔｅ</a>
              </li>
            )}
          </ul>
        </div>
        <div className="right-navbar">
          <input className="" type="text" onChange={handleInputChange} value={searchValue} />
          <MicIcon onClick={handleVoiceRecognition} />
          <SearchIcon
            onClick={() => {
              dispactch(setSearchVal({ search: searchValue }));
              dispactch(getProducts());
              navigate("/products");
            }}
          />
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
            <ShoppingBagIcon onClick={() => navigate("/register")} />
          )}
          {checkUserLogin() ? (
            <BookmarkBorderIcon onClick={() => navigate("/favorites")} />
          ) : (
            <BookmarkBorderIcon onClick={() => navigate("/register")} />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
