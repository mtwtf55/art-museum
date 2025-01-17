import "./Icon.scss";

import React from "react";

export type LinkProps = {
  onClick?: () => void;
  imgName: string;
  isClickable?: boolean;
};

export function Icon({
  onClick: handleClick,
  imgName,
  isClickable = true,
}: LinkProps) {
  function handleMouseEnter(e: React.MouseEvent<HTMLImageElement>) {
    e.currentTarget.style.cursor = isClickable ? "pointer" : "auto";
  }

  return (
    <img
      src={require(`@Assets/${imgName}`)}
      alt=""
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className="icon"
      data-testid="icon"
    />
  );
}
