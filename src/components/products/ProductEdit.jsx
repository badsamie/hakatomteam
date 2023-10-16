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
  const { loading, oneProduct, categories } = useSelector(
    (state) => state.products
  );

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
    <div 
    className="flex items-center justify-center h-screen bg-cover bg-center relative" 
    style={{ 
      backgroundImage: "url('https://i.pinimg.com/564x/7a/01/82/7a0182ed824ab6a160a8fef24fe696b4.jpg')" 
    }}
  >
      <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-xl w-3/4">
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              {product && (
                <div className="space-y-6">
                  <h3 className="text-4xl mb-4 text-center font-light uppercase">Edit Form</h3>

                  <input
                    type="text"
                    placeholder="name"
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    value={product.name}
                    className="border w-full py-2 px-3 text-center font-light uppercase "
                  />

                  <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    value={product.description}
                    className="border w-full py-2 px-3 text-center font-light uppercase"
                  />

                  <input
                    type="text"
                    placeholder="Price"
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    value={product.price}
                    className="border w-full py-2 px-3 text-center font-light uppercase"
                  />

                  <select
                    onChange={(e) =>
                      setProduct({ ...product, type: e.target.value })
                    }
                    value={product.type}
                    className="border w-full py-2 px-3 text-center font-light uppercase"
                  >
                    <option disabled>Choose category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <div className="flex space-x-4 items-center">
                    <input
                      type="text"
                      placeholder="Picture URL"
                      onChange={(e) =>
                        setProduct({ ...product, picture: e.target.value })
                      }
                      value={product.picture}
                      className="border w-2/3 py-2 px-3 rounded"
                    />
                    <img
                      src={
                        product.picture ||
                        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      }
                      alt={product.name || "avatar"}
                      className="w-48 h-48"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        dispatch(editProduct({ product }));
                        navigate("/products");
                      }}
                      className="bg-black text-white py-2 px-6 border w-full hover:bg-transparent hover:text-black font-light uppercase"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
