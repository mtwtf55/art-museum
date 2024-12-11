import { RootState } from "./store";

export const selectArtworks = (state: RootState) =>
  state.artworks.artworks.value;
export const selectIIIFUrl = (state: RootState) =>
  state.artworks.artworks.iiifUrl;
export const selectRandomArtWorks = (state: RootState) =>
  state.artworks.randomArtworks.value;
export const selectRandomArtworksIIIFUrl = (state: RootState) =>
  state.artworks.randomArtworks.iiifUrl;
