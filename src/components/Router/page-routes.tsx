import PathNames from "@constants/path-names";
import DetailInfo from "@pages/DetailInfo/DetailInfo";
import Favourites from "@pages/Favourites/Favourites";
import Home from "@pages/Home/Home";
import { RouteType } from "@src/types/route.type";

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
