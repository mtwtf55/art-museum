import { RootState } from "./store";

export const selectArtworks = (state: RootState) =>
  state.artworks.artworks.value;
export const selectIIIFUrl = (state: RootState) =>
  state.artworks.artworks.iiifUrl;
export const selectRandomArtWorks = (state: RootState) =>
  state.artworks.randomArtworks.value;
export const selectRandomArtworksIIIFUrl = (state: RootState) =>
  state.artworks.randomArtworks.iiifUrl;
export const selectSelectedArtwork = (state: RootState) =>
  state.artworks.selectedArtwork.value;
export const selectSelectedArtworkIIIFUrl = (state: RootState) =>
  state.artworks.selectedArtwork.iiifUrl;
export const selectFavouriteArtworks = (state: RootState) =>
  state.artworks.favouriteArtworks.value;
export const selectFavouriteArtworksIIIFUrl = (state: RootState) =>
  state.artworks.favouriteArtworks.iiifUrl;
