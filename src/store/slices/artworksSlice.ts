import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchArtwork,
  fetchArtworks,
  fetchArtworksByIds,
  fetchRandomArtworks,
} from "../thunks";
import { Artwork } from "../../types/types";

export interface ArtworksState {
  value: Artwork[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  iiifUrl: string;
}

export interface RandomArtworksState {
  value: Artwork[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  iiifUrl: string;
}

export interface SelectedArtworkState {
  value: Artwork | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  iiifUrl: string;
}

export interface FavouriteArtworksState {
  value: Artwork[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  iiifUrl: string;
}

const artworksInitialState: ArtworksState = {
  value: [],
  status: "idle",
  error: null,
  iiifUrl: "",
};

const randomArtworksInitialState: RandomArtworksState = {
  value: [],
  status: "idle",
  error: null,
  iiifUrl: "",
};

const selectedArtworkInitialState: SelectedArtworkState = {
  value: null,
  status: "idle",
  error: null,
  iiifUrl: "",
};

const favouriteArtworksInitialState: FavouriteArtworksState = {
  value: [],
  status: "idle",
  error: null,
  iiifUrl: "",
};

export interface SliceState {
  artworks: ArtworksState;
  randomArtworks: RandomArtworksState;
  selectedArtwork: SelectedArtworkState;
  favouriteArtworks: FavouriteArtworksState;
}

const sliceInitialState: SliceState = {
  artworks: artworksInitialState,
  randomArtworks: randomArtworksInitialState,
  selectedArtwork: selectedArtworkInitialState,
  favouriteArtworks: favouriteArtworksInitialState,
};

export const artworksSlice = createSlice({
  name: "artworks",
  initialState: sliceInitialState,
  reducers: {
    favouriteRemoved(state, action: PayloadAction<{ artworkId: number }>) {
      state.favouriteArtworks.value = state.favouriteArtworks.value.filter(
        (v) => v.id !== action.payload.artworkId,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtworks.pending, (state) => {
      state.artworks.status = "pending";
    });
    builder.addCase(fetchArtworks.fulfilled, (state, action) => {
      state.artworks.status = "succeeded";
      state.artworks.iiifUrl = action.payload["iiif_url"];
      state.artworks.value = action.payload;
    });
    builder.addCase(fetchArtworks.rejected, (state) => {
      state.artworks.status = "failed";
    });
    builder.addCase(fetchRandomArtworks.pending, (state) => {
      state.randomArtworks.status = "pending";
    });
    builder.addCase(fetchRandomArtworks.fulfilled, (state, action) => {
      state.randomArtworks.status = "succeeded";
      state.randomArtworks.value = action.payload;
      state.randomArtworks.iiifUrl = action.payload["iiif_url"];
    });
    builder.addCase(fetchRandomArtworks.rejected, (state) => {
      state.randomArtworks.status = "failed";
    });
    builder.addCase(fetchArtwork.pending, (state) => {
      state.selectedArtwork.status = "pending";
    });
    builder.addCase(fetchArtwork.fulfilled, (state, action) => {
      state.selectedArtwork.status = "succeeded";
      state.selectedArtwork.value = action.payload;
      state.selectedArtwork.iiifUrl = action.payload["iiif_url"];
    });
    builder.addCase(fetchArtwork.rejected, (state, action) => {
      state.selectedArtwork.status = "failed";
      state.selectedArtwork.error = action.error.message ?? null;
    });
    builder.addCase(fetchArtworksByIds.fulfilled, (state, action) => {
      state.favouriteArtworks.status = "succeeded";
      state.favouriteArtworks.value = action.payload;
      state.favouriteArtworks.iiifUrl = action.payload["iiif_url"];
    });
  },
});

// Action creators are generated for each case reducer function
export const { favouriteRemoved } = artworksSlice.actions;

export default artworksSlice.reducer;
