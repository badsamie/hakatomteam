export const getFavoritesData = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  if (!favorites) {
    return {
      user: "",
      products: [],
    };
  }
  return favorites;
};

export const setFavoritesData = (favoritesObj) => {
  favoritesObj.user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("favorites", JSON.stringify(favoritesObj));
};
export const checkProductInFavorites = (productId) => {
  const favorites = getFavoritesData();
  return favorites.products.find(
    (product) => product.productItem.id === productId
  );
};

export const deleteProductFromFavorites = (productId) => {
  const favorites = getFavoritesData();
  favorites.products = favorites.products.filter(
    (product) => product.productItem.id !== productId
  );
  setFavoritesData(favorites);
};

export const toggleProductToFavorites = (productObj) => {
  const favorites = getFavoritesData();
  if (!checkProductInFavorites(productObj.id)) {
    favorites.products.push({
      count: 1,
      productItem: productObj,
    });
  } else {
    favorites.products = favorites.products.filter(
      (product) => product.productItem.id !== productObj.id
    );
  }
  setFavoritesData(favorites);
};
