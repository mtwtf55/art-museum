import "./OtherWorks.scss";

import { Artwork } from "@src/types/types";
import React from "react";

import ArtworkCardSmall from "./ArtworkCardSmall/ArtworkCardSmall";

type OtherWorksProps = {
  artworks: Artwork[];
  iiifUrl: string;
};

function OtherWorks({ artworks, iiifUrl }: OtherWorksProps) {
  const artworksToRender = artworks.map((aw) => (
    <ArtworkCardSmall artwork={aw} key={aw.id} iiifUrl={iiifUrl} />
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
