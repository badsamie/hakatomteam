import React, { useState } from "react";
import ProductSearch from "../../components/products/ProductSearch";

const Detail = () => {
  const [isSidebar, setSidebar] = useState(false);

  return (
    <div>
      <button
        onClick={() => setSidebar(!isSidebar)}
        className="mt-36 bg-blue-900  text-white w-48 h-9 uppercase font-light "
      >
        Filter Products
      </button>
      {isSidebar && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 120,
            width: "15%",
            height: "60%",
            backgroundColor: "#f4f4f4",
            padding: "20px",
            boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
         <h3 className="uppercase text-center font-light text-blue-900">Filter Products</h3>
          {/* <input placeholder="Input 1" className="mb-4 block w-full p-2 border border-slate-300 h-8 mt-5 uppercase text-center" /> */}
          <ProductSearch />
          <input placeholder="Input 2" className="mb-4 block w-full p-2 border border-slate-300 h-8 mt-5 uppercase text-center" />
          <input placeholder="Input 3" className="mb-4 block w-full p-2 border border-slate-300 h-8 mt-5 uppercase text-center" />
        </div>
      )}
    </div>
  );
};

export default Detail;
