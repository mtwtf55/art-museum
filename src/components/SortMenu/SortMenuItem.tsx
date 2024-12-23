import "./SortMenu.scss";

import { Icon } from "@Components";
import React from "react";

const TICK_ICON = "tick-icon.svg";

function SortMenuItem({
  title,
  onSelect: handleSelect,
  isSelected,
}: {
  title: string;
  onSelect: (title: string) => void;
  isSelected: boolean;
}) {
  function handleClick() {
    handleSelect(title);
  }

  const selectedIcon = <Icon imgName={TICK_ICON} />;

  return (
    <div className="sort-menu__main__item" onClick={handleClick}>
      {isSelected && selectedIcon}
      {title}
    </div>
  );
}

export default SortMenuItem;
