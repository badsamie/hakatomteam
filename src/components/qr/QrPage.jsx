import React, { useState } from "react";
import Qr from "./Qr";

const QrPage = () => {
  const [text, setText] = useState("");
  const handChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Введите текст для QR-кода"
        value={text}
        onChange={handChange}
      />
      <Qr text={text} />
    </div>
  );
};

export default QrPage;
