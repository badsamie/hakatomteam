import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { logout, checkUserLogin } from "../../helpers/functions";
import MicIcon from "@mui/icons-material/Mic";
import { useDispatch, useSelector } from "react-redux";
import { setSearchVal } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";
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
          <a onClick={() => navigate("sound")}>ＲＡＬＰＨ ＬＡＵＲＥＮ</a>
        <div className="md:hidden flex justify-between items-center w-full px-4 bg-transparent">
          <a className="logo">ＲＡＬＰＨ ＬＡＵＲＥＮ</a>
          {menuOpen ? <CloseIcon onClick={() => setMenuOpen(false)} /> : <MenuIcon onClick={() => setMenuOpen(true)} />}
        </div>

            <li className="group relative">
              <a onClick={() => navigate("/products")}>Ｐｒｏｄｕｃｔｓ</a>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition ease-in-out duration-200  ">
                <p
                  onClick={() => navigate("jean")}
                  className="text-light lowercase"
                >
                  men
                </p>
                <hr />
                <p className="text-light lowercase ">women</p>
                <hr />
                <p>kids</p>
              </div>
            </li>
        <div className="hidden md:flex justify-between w-full px-4">
          <a className="logo">ＲＡＬＰＨ ＬＡＵＲＥＮ</a>

          <div className="flex space-x-4">
            <a onClick={() => navigate("/")}>Ｈｏｍｅ</a>
            <a onClick={() => navigate("/products")}>Ｐｒｏｄｕｃｔｓ</a>
            {checkUserLogin() && <a onClick={() => navigate("/product-create")}>Ｃｒｅａｔｅ</a>}
          </div>

          <div className="flex space-x-4">
            <SearchIcon />
            {checkUserLogin() ? (
              <>
                <PersonOffIcon onClick={() => {
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
          <div className="md:hidden">
            <a onClick={() => navigate("/")}>Ｈｏｍｅ</a>
            <a onClick={() => navigate("/products")}>Ｐｒｏｄｕｃｔｓ</a>
            {checkUserLogin() && <a onClick={() => navigate("/product-create")}>Ｃｒｅａｔｅ</a>}
            <SearchIcon />
            {checkUserLogin() ? (
              <>
                <PersonOffIcon onClick={() => {
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
        <div className="right-navbar">
          <input
            className=""
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
