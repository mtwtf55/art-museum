import { RootState } from "./store";

export const selectArtworks = (state: RootState) =>
  state.artworks.artworks.value;
export const selectIIIFUrl = (state: RootState) =>
  state.artworks.artworks.iiifUrl;
export const selectRandomArtworks = (state: RootState) =>
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
export const selectSearchArtworks = (state: RootState) =>
  state.artworks.searchArtworks.value;
export const selectSearchArtworksIIIFUrl = (state: RootState) =>
  state.artworks.searchArtworks.iiifUrl;
export const selectSearchArtworksLength = (state: RootState) =>
  state.artworks.searchArtworks.value.length;
export const selectArtworksAreLoading = (state: RootState) =>
  state.artworks.artworks.status === "pending";
export const selectRandomArtworksAreLoading = (state: RootState) =>
  state.artworks.randomArtworks.status === "pending";
export const selectFavouritesAreLoading = (state: RootState) =>
  state.artworks.favouriteArtworks.status === "pending";
export const selectSearchString = (state: RootState) =>
  state.artworks.searchArtworks.searchString;
