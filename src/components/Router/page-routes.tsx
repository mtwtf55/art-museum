import PathNames from "@Constants/path-names";
import DetailInfo from "@Pages/DetailInfo/DetailInfo";
import Favourites from "@Pages/Favourites/Favourites";
import Home from "@Pages/Home/Home";
import { RouteType } from "@Types/route.type";
import React from "react";

const pageRoutes: RouteType[] = [
  {
    path: PathNames.HOME,
    title: "Home",
    element: <Home />,
  },
  {
    path: PathNames.FAVOURITES,
    title: "Favourites",
    element: <Favourites />,
  },
  {
    path: PathNames.DETAIL_INFO,
    title: "Artwork details",
    element: <DetailInfo />,
  },
];

export default pageRoutes;
