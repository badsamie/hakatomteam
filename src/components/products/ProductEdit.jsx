import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editProduct,
  getCategories,
  getOneProduct,
} from "../../store/products/productsActions";
import { clearOneProductState } from "../../store/products/productSlice";

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
    <div>
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <>
          {product && (
            <div className="mt-12">
              <h3>Edit Form</h3>

              <input
                type="text"
                placeholder="name"
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                value={product.name}
              />
              <input
                type="text"
                placeholder="Decription"
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                value={product.description}
              />
              <input
                type="text"
                placeholder="Price"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                value={product.price}
              />

              <select
                onChange={(e) =>
                  setProduct({ ...product, type: e.target.value })
                }
                value={product.type}
              >
                <option disabled>chose category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {" "}
                    {category}
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="text"
                  placeholder="picture"
                  onChange={(e) =>
                    setProduct({ ...product, picture: e.target.value })
                  }
                  value={product.picture}
                />
                {product.picture ? (
                  <img
                    src={product.picture}
                    alt={product.name}
                    width="100"
                    height="100"
                  />
                ) : (
                  <img
                    src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    alt="avatar"
                    width="100"
                    height="100"
                  />
                )}
                <div>
                  <button
                    onClick={() => {
                      dispatch(editProduct({ product }));
                      navigate("/products");
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductEdit;
