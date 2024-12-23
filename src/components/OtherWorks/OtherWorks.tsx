import "./OtherWorks.scss";

import SortMenu from "@Components/SortMenu/SortMenu";
import { Artwork } from "@Types/types";
import React from "react";

import ArtworkCardSmall from "./ArtworkCardSmall/ArtworkCardSmall";

type OtherWorksProps = {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  iiifUrl: string;
};

function OtherWorks({ artworks, iiifUrl, setArtworks }: OtherWorksProps) {
  const artworksToRender = artworks.map((aw) => (
    <ArtworkCardSmall artwork={aw} key={aw.id} iiifUrl={iiifUrl} />
  ));

  return (
    <div className="other-works">
      <p className="other-works__pretitle">Here some more</p>
      <div className="other-works__title">
        Other works for you
        <div className="sort-icon">
          <SortMenu data={artworks} setData={setArtworks} />
        </div>
      </div>
      <div className="other-works__main">{artworksToRender}</div>
    </div>
  );
}

export default OtherWorks;
