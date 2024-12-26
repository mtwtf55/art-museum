import "./SortMenu.scss";

import { Icon } from "@Components/Icon/Icon";
import { Artwork } from "@Types";
import { useState } from "react";

import { SortMenuItem } from "./SortMenuItem";

type SortMenuProps = {
  data: Artwork[];
  setData: (artworks: Artwork[]) => void;
};

const SORT_BY = {
  TITLE: "Title",
  AUTHOR: "Author",
  PUBLIC: "Publicity",
};

const SORT_ICON_NAME = "sort-icon.svg";

export function SortMenu({ data, setData }: SortMenuProps) {
  const [isSortClicked, setIsSortClicked] = useState<boolean>(false);
  const [sortBySelected, setSortBySelected] = useState<string | null>(null);

  function handleSelect(title: string) {
    setData(data.sort(getSortFunction(title)));
    setSortBySelected(title);
    handleHide();
  }

  function handleSortIconClicked() {
    setIsSortClicked(!isSortClicked);
  }

  function handleHide() {
    setIsSortClicked(false);
  }

  function getSortFunction(title: string) {
    switch (title) {
      case SORT_BY.TITLE:
        return (a: Artwork, b: Artwork) => a.title.localeCompare(b.title);
      case SORT_BY.AUTHOR:
        return (a: Artwork, b: Artwork) =>
          a.artist_title ? a.artist_title.localeCompare(b.artist_title) : 1;
      case SORT_BY.PUBLIC:
        return (a: Artwork) => (a.is_public_domain ? -1 : 1);
    }
  }

  const menuItems = Object.values(SORT_BY).map((value) => (
    <SortMenuItem
      title={value}
      onSelect={handleSelect}
      isSelected={sortBySelected === value}
      key={value}
    />
  ));

  return (
    <div className="sort-menu">
      <Icon
        imgName={SORT_ICON_NAME}
        isClickable={true}
        onClick={handleSortIconClicked}
      />
      {isSortClicked && (
        <div className="sort-menu__main" data-testid="sort-menu">
          {menuItems}
        </div>
      )}
    </div>
  );
}
