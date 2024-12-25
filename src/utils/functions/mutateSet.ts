import { Artwork, ArtworksResponseType } from "@Types";
import { SetStateAction } from "react";

export function mutateSet(
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
