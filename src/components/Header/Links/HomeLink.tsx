import { Icon } from "@Components";
import { PathNames } from "@Constants";
import { useNavigate } from "react-router-dom";

const HOME_LOGO_NAME = "home.svg";

export function HomeLink() {
  const navigate = useNavigate();

  function handleHomeClicked() {
    navigate(PathNames.HOME);
  }

  return <Icon onClick={handleHomeClicked} imgName={HOME_LOGO_NAME} />;
}
