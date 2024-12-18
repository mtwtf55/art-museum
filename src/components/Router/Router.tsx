import React from "react";
import { Route, Routes } from "react-router-dom";

import pageRoutes from "./page-routes";

function Router() {
  const routes = pageRoutes.map((route) => (
    <Route key={route.title} path={route.path} element={route.element} />
  ));

  return <Routes>{routes}</Routes>;
}

export default Router;
