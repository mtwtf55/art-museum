import { Icon } from "@Components";
import pathNames from "@Constants/path-names";
import React from "react";
import { useNavigate } from "react-router-dom";

const HOME_LOGO_NAME = "home.svg";

function HomeLink() {
  const navigate = useNavigate();

  function handleHomeClicked() {
    navigate(pathNames.HOME);
  }

  return <Icon onClick={handleHomeClicked} imgName={HOME_LOGO_NAME} />;
}

export default HomeLink;
