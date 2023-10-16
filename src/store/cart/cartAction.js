export const getCartData = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart)
    return {
      user: "",
      totalCost: 0,
      products: [0],
    };
  return cart;
};
export const setCartData = (cartObj) => {
  cartObj.user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("cart", JSON.stringify(cartObj));
};
export const checkProductInCart = (productId) => {
  const cart = getCartData();
  cart.products.find((product) => product.productItem.id === productId);
};
export const countCartTotalCost = (cartProducts) => {
  cartProducts.reduce((acc, currVal) => {
    return acc + currVal.totalPrice;
  }, 0);
};
export const toggleProductToCart = (productObj) => {
  const cart = getCartData();
  if (!checkProductInCart(productObj.id)) {
    cart.products.push({
      count: 1,
      totalPrice: +productObj.price,
      productItem: productObj,
    });
  } else {
    cart.products = cart.products.filter(
      (product) => product.productItem.id !== productObj.id
    );
  }
  cart.totalCost = countCartTotalCost(cart.products);
  setCartData(cart);
};
