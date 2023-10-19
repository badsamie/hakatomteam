import React from "react";
import QRCode from "qrcode-react";

const Qr = ({ text }) => {
  return (
    <div>
      <QRCode value={text} />
    </div>
  );
};

export default Qr;
