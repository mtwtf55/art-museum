import { pageRoutes } from "@Components/Router/page-routes";
import React from "react";
import { Route, Routes } from "react-router-dom";

export function Router() {
  const routes = pageRoutes.map((route) => (
    <Route key={route.title} path={route.path} element={route.element} />
  ));

  return <Routes>{routes}</Routes>;
}
