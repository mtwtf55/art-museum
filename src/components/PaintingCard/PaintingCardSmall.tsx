import React from "react";
import "./PaintingCardSmall.scss";
import AddToFavourites from "../Buttons/AddToFavourites/AddToFavourites";

type PaintingCardSmallProps = {
  name: string;
  author: string;
  isPublic: boolean;
};

function PaintingCardSmall({ name, author, isPublic }: PaintingCardSmallProps) {
  return (
    <div className="card">
      <div className="card__inner">
        <div className="card__inner__picture">
          <img src={require("../../assets/picture.png")} alt="Picture" />
        </div>
        <div className="card__inner__info">
          <span className="card__inner__info__name">{name}</span>
          <span className="card__inner__info__author">{author}</span>
          <span className="card__inner__info__isPublic">{isPublic}</span>
        </div>
        <div className="card__inner__add-to-favourites">
          <AddToFavourites />
        </div>
      </div>
    </div>
  );
}

export default PaintingCardSmall;
