import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchVal } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";
import { useNavigate } from "react-router";

const Speach = () => {
  const { search } = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState("");
  const dispactch = useDispatch();
  const navigate = useNavigate();

  //  !------------------voice
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
  //  !------------------voice
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

  return (
    <div className="bg-red-400 mt-10">
      <button onClick={handleVoiceRecognition}>Start Voice Recognition</button>
      <input
        type="text"
        onChange={handleInputChange}
        value={searchValue}
        id="Search"
        placeholder="Search"
        className="text-black font-serif border lowercase text-md text-center w-40"
      />
      <button
        onClick={() => {
          dispactch(setSearchVal({ search: searchValue }));
          dispactch(getProducts());
        }}
      >
        tab
      </button>
    </div>
  );
};

export default Speach;
