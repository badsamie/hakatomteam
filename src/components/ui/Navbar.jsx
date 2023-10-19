import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import {
  logout,
  checkUserLogin,
  checkAdminLogin,
} from "../../helpers/functions";
import MicIcon from "@mui/icons-material/Mic";
import { useDispatch, useSelector } from "react-redux";
import { setSearchVal } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";
import Sound from "../games/Sound";
const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="md:hidden flex justify-between items-center w-full  px-4 bg-transparent">
          <a className="logo">ＲＡＬＰＨ ＬＡＵＲＥＮ</a>
          {menuOpen ? (
            <CloseIcon onClick={() => setMenuOpen(false)} />
          ) : (
            <MenuIcon onClick={() => setMenuOpen(true)} />
          )}
        </div>
        <div className="hidden md:flex justify-between w-full px-4 h-8">
          <a className="logo">ＲＡＬＰＨ ＬＡＵＲＥＮ</a>

          <div className="flex space-x-4 ">
            <a className="cursor-pointer" onClick={() => navigate("/")}>
              Ｈｏｍｅ
            </a>
            <a className="cursor-pointer" onClick={() => navigate("/products")}>
              Ｐｒｏｄｕｃｔｓ
            </a>
            {checkAdminLogin() && (
              <a
                className="cursor-pointer"
                onClick={() => navigate("/product-create")}
              >
                Ｃｒｅａｔｅ
              </a>
            )}
          </div>

          <div className="flex space-x-4">
            <input
              className="w-20"
              type="text"
              onChange={handleInputChange}
              value={searchValue}
            />

            <MicIcon onClick={handleVoiceRecognition} />

            <SearchIcon
              onClick={() => {
                dispactch(setSearchVal({ search: searchValue }));
                dispactch(getProducts());
                navigate("/products");
              }}
            />
            <Sound />
            {checkUserLogin() ? (
              <>
                <PersonOffIcon
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                />
                <ShoppingBagIcon onClick={() => navigate("/cart")} />
                <BookmarkBorderIcon onClick={() => navigate("/favorites")} />
              </>
            ) : (
              <>
                <PermIdentityIcon onClick={() => navigate("/register")} />
                <ShoppingBagIcon onClick={() => navigate("/register")} />
                <BookmarkBorderIcon onClick={() => navigate("/register")} />
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col">
            <a onClick={() => navigate("/")}>Ｈｏｍｅ</a>
            <a onClick={() => navigate("/products")}>Ｐｒｏｄｕｃｔｓ</a>
            {checkUserLogin() && (
              <a onClick={() => navigate("/product-create")}>Ｃｒｅａｔｅ</a>
            )}
            <SearchIcon />
            {checkUserLogin() ? (
              <>
                <PersonOffIcon
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                />
                <ShoppingBagIcon onClick={() => navigate("/cart")} />
                <BookmarkBorderIcon onClick={() => navigate("/favorites")} />
              </>
            ) : (
              <>
                <PermIdentityIcon onClick={() => navigate("/register")} />
                <ShoppingBagIcon onClick={() => navigate("/register")} />
                <BookmarkBorderIcon onClick={() => navigate("/register")} />
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
