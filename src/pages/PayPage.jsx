import React, { useState } from "react";
import "./PayPage.css";
import { useNavigate } from "react-router";

function PayPage() {
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiredMonth, setExpiredMonth] = useState("");
  const [expiredYear, setExpiredYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [cardSide, setCardSide] = useState("front");

  const navigate = useNavigate();

  const formatCardNumber = (input) => {
    if (input.length > 18) {
      return;
    }
    input = input.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
    setCardNumber(input);
  };

  const isValid = () => {
    if (cardholder.length < 5) {
      return false;
    }
    if (cardNumber === "") {
      return false;
    }
    if (expiredMonth === "" && expiredYear === "") {
      return false;
    }
    if (securityCode.length !== 3) {
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    alert(`You did it, ${cardholder}.`);
  };

  return (
    <div className="m-4" style={{ backgroundImage: "url()" }}>
      <div className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-darkkhaki">
        <header className="header">
          <div
            className="relative front"
            style={{ display: cardSide === "front" ? "block" : "none" }}
          >
            <img
              className="w-full h-auto"
              src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png"
              alt="front credit card"
            />
            <div
              className="relative back"
              style={{ display: cardSide === "back" ? "block" : "none" }}
            >
              <p className="number mb-5 sm:text-xl">
                {cardNumber !== "" ? cardNumber : "0000 0000 0000 0000"}
              </p>
              <div className="flex flex-row justify-between">
                <p>{cardholder !== "" ? cardholder : "Card holder"}</p>
                <div>
                  <span>{expiredMonth}</span>
                  {expiredMonth !== "" && <span>/</span>}
                  <span>{expiredYear}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="relative"
            style={{ display: cardSide === "back" ? "block" : "none" }}
          >
            <img
              className="w-full h-auto"
              src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-back.png"
              alt=""
            />
            <div className="bg-transparent text-white text-xl w-full flex justify-end absolute bottom-20 px-8  sm:bottom-24 right-0 sm:px-12">
              <div className="border border-white w-16 h-9 flex justify-center items-center">
                <p>{securityCode !== "" ? securityCode : "code"}</p>
              </div>
            </div>
          </div>
          <ul className="flex">
            <li className="mx-2">
              <img
                className="w-16"
                src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                alt=""
              />
            </li>
            <li className="mx-2">
              <img
                className="w-14"
                src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                alt=""
              />
            </li>
            <li className="ml-5">
              <img
                className="w-7"
                src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                alt=""
              />
            </li>
          </ul>
        </header>
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Card payment
          </h1>
          <div>
            <div className="my-3">
              <input
                type="text"
                className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card holder"
                maxLength="22"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => {
                  formatCardNumber(e.target.value);
                }}
                maxLength="19"
              />
            </div>
            <div className="my-3 flex flex-col">
              <div className="mb-2">
                <label className="text-gray-700">Expired</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expiredMonth}
                  onChange={(e) => setExpiredMonth(e.target.value)}
                >
                  <option value="" selected disabled>
                    MM
                  </option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select
                  className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  value={expiredYear}
                  onChange={(e) => setExpiredYear(e.target.value)}
                >
                  <option value="" selected disabled>
                    YY
                  </option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <input
                  type="text"
                  className="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  placeholder="Security code"
                  maxLength="3"
                  value={securityCode}
                  onFocus={() => setCardSide("back")}
                  onBlur={() => setCardSide("front")}
                  onChange={(e) => setSecurityCode(e.target.value)}
                />
              </div>
            </div>
          </div>
        </main>
        <footer className="mt-6 p-4">
          <button
            className={`submit-button px-4 py-3 rounded-full ${
              isValid()
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-50 text-gray-500"
            } focus:ring focus:outline-none w-full text-xl font-semibold transition-colors`}
            disabled={!isValid()}
            onClick={() => navigate("/")}
          >
            Pay now
          </button>
        </footer>
      </div>
    </div>
  );
}

export default PayPage;
