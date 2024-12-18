import { Artwork } from "@src/types/types";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

type ArtworksContextType = {
  artworks: Artwork[];
};

type ArtworksActionsType = {
  addArtworks: (artworks: Artwork[]) => void;
};

export const ArtworksContext = createContext<ArtworksContextType | null>(null);
export const ArtworksActionsContext = createContext<ArtworksActionsType | null>(
  null,
);

export const ArtworksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const addArtworks = useCallback((artworks: Artwork[]) => {
    setArtworks((prev) => [...prev, ...artworks]);
  }, []);

  const value = useMemo(() => ({ artworks }), [artworks]);
  const actions = useMemo(() => ({ addArtworks }), [addArtworks]);

  return (
    <ArtworksContext.Provider value={value}>
      <ArtworksActionsContext.Provider value={actions}>
        {children}
      </ArtworksActionsContext.Provider>
    </ArtworksContext.Provider>
  );
};
