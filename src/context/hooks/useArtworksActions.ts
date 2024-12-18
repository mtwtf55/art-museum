import { ArtworksActionsContext } from "@src/context/ArtworksProvider";
import { useContext } from "react";

export const useArtworksActions = () => {
  const artworksActionsContext = useContext(ArtworksActionsContext);

  if (!artworksActionsContext)
    throw new Error("useArtworksActions must be used within ArtworksProvider");

  return artworksActionsContext;
};
