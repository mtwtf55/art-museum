import React from "react";

type PaginationItemProps = {
  value: number;
  onClick: () => void;
  selected: boolean;
};

function PaginationItem({ value, onClick, selected }: PaginationItemProps) {
  return (
    <div
      className={`pagination__item${selected ? "__selected" : ""}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

export default PaginationItem;
