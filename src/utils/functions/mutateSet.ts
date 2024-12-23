import { Artwork, ArtworksResponseType } from "@Types/types";
import { SetStateAction } from "react";

function mutateSet(
  setFunc: (value: SetStateAction<ArtworksResponseType | null>) => void,
) {
  return (artworks: Artwork[]) => {
    setFunc((prevState) => {
      if (prevState === null) return null;

      const clone = structuredClone(prevState) as ArtworksResponseType;
      clone.data = artworks;
      return clone;
    });
  };
}

export default mutateSet;
