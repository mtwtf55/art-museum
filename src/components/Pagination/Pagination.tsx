import React from "react";
import "./Pagination.scss";
import PaginationItem from "./PaginationItem";
import Icon from "@components/Icon/Icon";

const NEXT_ICON_NAME = "next-icon.svg";

type PaginationProps = {
  page: number;
  setPage: (p: number) => void;
  pagesCount: number;
};

function Pagination({ page, setPage, pagesCount }: PaginationProps) {
  function handleNextIconClicked() {
    if (page === pagesCount) setPage(1);
    else setPage(page + 1);
  }

  function changePageValue(val: number) {
    setPage(val);
  }

  function makePaginationItem(pageValue: number) {
    function handlePaginationItemClicked() {
      changePageValue(pageValue);
    }

    return (
      <PaginationItem
        value={pageValue}
        onClick={handlePaginationItemClicked}
        selected={page === pageValue}
        key={pageValue}
      />
    );
  }

  const paginationItems = Array.from(
    { length: pagesCount },
    (v, k) => k + 1,
  ).map(makePaginationItem);

  return (
    <div className="pagination">
      {paginationItems}
      <Icon imgName={NEXT_ICON_NAME} onClick={handleNextIconClicked} />
    </div>
  );
}

export default Pagination;
