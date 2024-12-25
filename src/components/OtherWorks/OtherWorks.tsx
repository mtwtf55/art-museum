import "./OtherWorks.scss";

import SortMenu from "@Components/SortMenu/SortMenu";
import { Artwork } from "@Types/types";
import React, { useMemo } from "react";

import ArtworkCardSmall from "./ArtworkCardSmall/ArtworkCardSmall";

type OtherWorksProps = {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  iiifUrl: string;
};

function OtherWorks({ artworks, iiifUrl, setArtworks }: OtherWorksProps) {
  const artworksToRender = useMemo(
    () =>
      artworks.map((aw) => (
        <ArtworkCardSmall artwork={aw} key={aw.id} iiifUrl={iiifUrl} />
      )),
    [artworks],
  );

  return (
    <div className="other-works">
      <span className="other-works__pretitle">Here some more</span>
      <div className="other-works__title__container">
        <h2 className="other-works__title__text">Other works for you</h2>
        <div className="sort-icon">
          <SortMenu data={artworks} setData={setArtworks} />
        </div>
      </div>
      <div className="other-works__main">{artworksToRender}</div>
    </div>
  );
}

export default OtherWorks;
