import React from "react";
import "./Pagination.scss";
import PaginationItem from "./PaginationItem";
// @ts-ignore
import nextIcon from "../../assets/next-icon.svg";

type PaginationProps = {
  page: number;
  setPage: (p: number) => void;
  pagesCount: number;
};

function Pagination({ page, setPage, pagesCount }: PaginationProps) {
  function nextIconOnClick() {
    if (page === pagesCount) setPage(1);
    else setPage(page + 1);
  }

  function paginationItemOnClick(val: number) {
    setPage(val);
  }

  return (
    <div className="pagination">
      {Array.from({ length: pagesCount }, (v, k) => k + 1).map((v) => (
        <PaginationItem
          value={v}
          onClick={() => paginationItemOnClick(v)}
          selected={page === v}
          key={v}
        />
      ))}

      <img
        src={nextIcon}
        alt="next icon"
        className={"pagination__next-icon"}
        onClick={nextIconOnClick}
      />
    </div>
  );
}

export default Pagination;
