import React from "react";
import Samagan from "../pages/samagan/Samagan";
import { Route, Routes } from "react-router-dom";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductEditPage from "../pages/ProductEditPage";

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
      path: "/products/:id",
      element: <ProductDetailsPage />,
    },
    {
      id: 5,
      path: "/product-edit/:id",
      element: <ProductEditPage />,
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
