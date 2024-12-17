import React from "react";

export type LinkProps = {
  onClick?: () => void;
  imgName: string;
  isClickable?: boolean;
};

function Icon({
  onClick: handleClick,
  imgName,
  isClickable = true,
}: LinkProps) {
  function handleMouseEnter(e: React.MouseEvent<HTMLImageElement>) {
    e.currentTarget.style.cursor = isClickable ? "pointer" : "auto";
  }

  return (
    <img
      src={require(`@assets/${imgName}`)}
      alt=""
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    />
  );
}

export default Icon;
