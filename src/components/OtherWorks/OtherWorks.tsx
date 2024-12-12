import React from "react";
import { Artwork } from "../../types/types";
import "./OtherWorks.scss";
import ArtworkCardSmall from "./ArtworkCardSmall/ArtworkCardSmall";

type OtherWorksProps = {
  artworks: Artwork[];
};

function OtherWorks({ artworks }: OtherWorksProps) {
  const artworksToRender = artworks.map((aw) => (
    <ArtworkCardSmall artwork={aw} key={aw.id} />
  ));

  return (
    <div className="other-works">
      <p className="other-works__pretitle">Here some more</p>
      <p className="other-works__title">Other works for you</p>
      <div className="other-works__main">{artworksToRender}</div>
    </div>
  );
}

export default OtherWorks;
