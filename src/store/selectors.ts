import { RootState } from "./store";

export const selectArtworks = (state: RootState) => state.artworks.artworks;
export const selectIIIFUrl = (state: RootState) => state.artworks.iiifUrl;
