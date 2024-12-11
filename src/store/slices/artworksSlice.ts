import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { fetchArtworks } from "../thunks";
import { Artwork } from "../../types/types";

export interface ArtworksState {
  artworks: Artwork[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  iiifUrl: string;
}

const initialState: ArtworksState = {
  artworks: [],
  status: "idle",
  error: null,
  iiifUrl: "",
};

export const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {
    postsAdded(state, action: PayloadAction<Artwork[]>) {
      state.artworks.concat(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtworks.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchArtworks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.iiifUrl = action.payload["iiif_url"];
      state.artworks = action.payload;
    });
    builder.addCase(fetchArtworks.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generated for each case reducer function
export const { postsAdded } = artworksSlice.actions;

export default artworksSlice.reducer;
