import { ArtworksContext } from "@src/context/ArtworksProvider";
import { useContext } from "react";

export const useArtworks = () => {
  const artworksContext = useContext(ArtworksContext);

  if (!artworksContext)
    throw new Error("useArtworks must be used within ArtworksProvider");

  return artworksContext;
};
