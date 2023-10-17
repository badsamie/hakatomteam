import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editProduct,
  getCategories,
  getOneProduct,
} from "../../store/products/productsActions";
import { clearOneProductState } from "../../store/products/productSlice";
import LoadingIndicator from "../../pages/sabina/LoadingIndicator";

const ProductEdit = () => {
  const { loading, oneProduct, categories } = useSelector((state) => state.products);

  const [product, setProduct] = useState(oneProduct);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneProduct({ id }));
    dispatch(getCategories());
    return () => dispatch(clearOneProductState());
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setProduct(oneProduct);
    }
  }, [oneProduct]);

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://i.pinimg.com/564x/7a/01/82/7a0182ed824ab6a160a8fef24fe696b4.jpg')" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-xl w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5 space-y-4">
          {loading ? (
            <LoadingIndicator />
          ) : (
            product && (
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl text-center font-light uppercase">Edit Form</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="border w-full py-2 px-3" />
                  <input type="text" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} className="border w-full py-2 px-3" />
                  <input type="text" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="border w-full py-2 px-3" />
                  <select value={product.type} onChange={(e) => setProduct({ ...product, type: e.target.value })} className="border w-full py-2 px-3">
                    <option disabled>Choose category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
                    <input type="text" placeholder="Picture URL" value={product.picture} onChange={(e) => setProduct({ ...product, picture: e.target.value })} className="border w-full sm:w-2/3 py-2 px-3" />
                    <img src={product.picture || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt={product.name || "avatar"} className="w-32 h-32 sm:w-48 sm:h-48" />
                  </div>
                </div>
                <div className="mt-4">
                  <button onClick={() => { dispatch(editProduct({ product })); navigate("/products"); }} className="bg-black text-white py-2 px-6 border w-full hover:bg-transparent hover:text-black font-light uppercase">
                    Save
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
