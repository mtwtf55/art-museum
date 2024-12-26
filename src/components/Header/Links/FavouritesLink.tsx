import { Icon } from "@Components";
import { PathNames } from "@Constants";
import { useNavigate } from "react-router-dom";

const FAVOURITES_LOGO_NAME = "favourites.svg";

export function FavouritesLink() {
  const navigate = useNavigate();

  function handleFavouritesClicked() {
    navigate(PathNames.FAVOURITES);
  }

  return (
    <Icon onClick={handleFavouritesClicked} imgName={FAVOURITES_LOGO_NAME} />
  );
}
