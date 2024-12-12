import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/Home/Home";
import DetailInfo from "./pages/DetailInfo/DetailInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favourites from "./pages/Favourites/Favourites";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/artworks/:artworkId"} element={<DetailInfo />} />
        <Route path={"/favourites"} element={<Favourites />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>,
);
