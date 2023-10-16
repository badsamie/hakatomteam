import React from "react";
import Samagan from "../pages/samagan/Samagan";
import { Route, Routes } from "react-router-dom";
import CarouselPage from "../pages/sabina/CarouselPage";
import Register from "../components/account/Register";
import Login from "../components/account/Login";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductPage from "../pages/ProductPage";

import PayPage from "../pages/PayPage";

import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductEditPage from "../pages/ProductEditPage";
import CartPage from "../pages/CartPage";
import Favorites from "../components/favorites/Favorites";

const MainRoutes = () => {
  const ROUTES = [
    {
      id: 1,
      path: "/",
      element: <Samagan />,
    },
    {
      id: 2,
      path: "/products",
      element: <ProductPage />,
    },
    {
      id: 3,
      path: "/product-create",
      element: <ProductCreatePage />,
    },
    {
      id: 4,

      path: "/paypage",
      element: <PayPage />,
    },
    {
      id: 5,
      path: "/products/:id",
      element: <ProductDetailsPage />,
    },
    {
      id: 6,
      path: "/product-edit/:id",
      element: <ProductEditPage />,
    },
    {
      id: 7,
      path: "/register",
      element: <Register />,
    },
    {
      id: 8,
      path: "/login",
      element: <Login />,
    },
    {
      id: 9,
      path: "/cart",
      element: <CartPage />,
    },
    {
      id: 10,
      path: "/favorites",
      element: <Favorites/>
    },
  ];

  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
