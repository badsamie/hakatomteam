import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    toggleProductToFavorites,
    checkProductInFavorites,
  } from "../../store/favorites/FavoritesAction";
  import { getFavorites } from "../../store/favorites/FavoritesSlice";
import { BookmarkAddOutlined, BookmarkAddedSharp } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const ProductFavorites = () => {
    const { oneProduct } = useSelector((state) => state.products);
    const dispatch = useDispatch()

    
  const { favorites } = useSelector((state) => state.favorites);
  const [isProductInFavorites, setIsProductInFavorites] = useState(false);
  const { id } = useParams();
  

  useEffect(() => {
    if (!oneProduct) return;
    if (checkProductInFavorites(oneProduct.id)) {
      setIsProductInFavorites(true);
    } else {
      setIsProductInFavorites(false);
    }
  }, [favorites, oneProduct]);

  return (
    <button
    onClick={() => {
      toggleProductToFavorites(oneProduct);
      dispatch(getFavorites());
    }}
  >
    {isProductInFavorites
      ? <BookmarkAddedSharp />
      : <BookmarkAddOutlined />}
  </button>
  )

}

export default ProductFavorites