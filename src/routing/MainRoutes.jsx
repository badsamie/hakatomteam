import React from "react";
import Samagan from "../pages/samagan/Samagan";
import Sabina from "../pages/sabina/Sabina";
import Aisuluu from "../pages/aisuluu/Aisuluu";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  const ROUTES = [
    {
      id: 1,
      path: "/",
      element: <Samagan />,
    },
    {
      id: 2,
      path: "/sabina",
      element: <Sabina />,
    },
    {
      id: 3,
      path: "/aisuluu",
      element: <Aisuluu />,
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
