import { PathNames } from "@Constants";
import { DetailInfo, Favourites, Home } from "@Pages";
import { RouteType } from "@Types";

export const pageRoutes: RouteType[] = [
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
