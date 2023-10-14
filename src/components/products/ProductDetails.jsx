import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProduct,
  getOneProduct,
} from "../../store/products/productsActions";
import { clearOneProductState } from "../../store/products/productSlice";
import { checkUserLogin } from "../../helpers/functions";
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";

const ProductDetails = () => {
  const { loading, oneProduct } = useSelector((state) => state.products);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct({ id }));
    return () => dispatch(clearOneProductState());
  }, []);

  return (
    <>
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <>
          {oneProduct && (
            <div className="mt-48 w-56 h-20">
              <img src={oneProduct.picture} alt="" />
              <h3>{oneProduct.name}</h3>
              {oneProduct.rating && <h3>Raiting:{oneProduct.rating}</h3>}
              <p>{oneProduct.description}</p>
              <p>${oneProduct.price}</p>
              <>
                {checkUserLogin() && <CommentCreate product={oneProduct} />}
                {oneProduct.comments ? (
                  <CommentList comments={oneProduct.comments} />
                ) : (
                  <h3>No soska</h3>
                )}
              </>
              {checkUserLogin() && (
                <div>
                  <button
                    onClick={() => {
                      navigate(`/product-edit/${oneProduct.id}`);
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteProduct({ id: oneProduct.id }));
                      navigate("/products");
                    }}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
