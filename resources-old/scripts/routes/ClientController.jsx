/**
 * Rotas da Area Client.
 */
import React from "react";
import { useRoutes } from "react-router-dom";
import Teste from '../pages/client/teste.jsx'

const ClientController = () => {
  const element = useRoutes([
  {
    path: "/",
    element: <Teste />,
  },
  {
    path: "/users",
    element: <Teste />,
  },
  {
    path: "/settings",
    element: <Teste />,
  },
]);

  return element;
};

export default ClientController;
