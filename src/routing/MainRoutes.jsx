import React from "react";
import Samagan from "../pages/samagan/Samagan";
import { Route, Routes } from "react-router-dom";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductPage from "../pages/ProductPage";

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
