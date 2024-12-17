import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailInfo from "@pages/DetailInfo/DetailInfo";
import Favourites from "@pages/Favourites/Favourites";
import Home from "@pages/Home/Home";

function App() {
  return <Routing />;
}

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

export default App;
