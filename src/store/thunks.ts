import { createAppAsyncThunk } from "@src/withTypes";
import axios from "axios";
import { Artwork, Search } from "@src/types/types";

axios.defaults.baseURL = "https://api.artic.edu/api/v1";
const SEARCH_LIMIT = 24;

const requestedFields = [
  "id",
  "title",
  "dimensions",
  "artist_id",
  "artist_title",
  "image_id",
  "date_display",
  "credit_line",
  "is_public_domain",
  "gallery_id",
  "gallery_title",
  "place_of_origin",
  "alt_image_ids",
];

const requestedSearchFields = ["id", "api_link", "title"];

export const fetchArtworks = createAppAsyncThunk(
  "artworks/fetchArtworks",
  async () => {
    const response = await axios
      .get<Artwork[]>(`/artworks?fields=${requestedFields.join(",")}`)
      .then((res) => res.data)
      .then((data) => {
        // @ts-ignore
        data["data"]["iiif_url"] = data["config"]["iiif_url"];
        return data;
      });
    // @ts-ignore
    return response["data"];
  },
);

export const fetchRandomArtworks = createAppAsyncThunk(
  "artworks/fetchRandomArtworks",
  async (limit: number) => {
    const randomOffset = Math.round(Math.random() * 1000);
    const response = await axios
      .get<Artwork[]>(
        `/artworks?fields=${requestedFields.join(",")}&page=${randomOffset}&limit=${limit}`,
      )
      .then((res) => res.data)
      .then((data) => {
        // @ts-ignore
        data["data"]["iiif_url"] = data["config"]["iiif_url"];
        return data;
      });
    // @ts-ignore
    return response["data"];
  },
);

export const fetchArtwork = createAppAsyncThunk(
  "artworks/fetchArtwork",
  async (artworkId: string) => {
    const response = await axios
      .get<Artwork>(
        `/artworks/${artworkId}?fields=${requestedFields.join(",")}`,
      )
      .then((res) => res.data)
      .then((data) => {
        // @ts-ignore
        data["data"]["iiif_url"] = data["config"]["iiif_url"];
        return data;
      });
    // @ts-ignore
    return response["data"];
  },
);

export const fetchArtworksByIds = createAppAsyncThunk(
  "artworks/fetchArtworksByIds",
  async (ids: string[]) => {
    const response = await axios
      .get<Artwork[]>(
        `/artworks?ids=${ids.join(",")}&fields=${requestedFields.join(",")}`,
      )
      .then((res) => res.data)
      .then((data) => {
        // @ts-ignore
        data["data"]["iiif_url"] = data["config"]["iiif_url"];
        return data;
      });
    // @ts-ignore
    return response["data"];
  },
);

export const searchArtworks = createAppAsyncThunk(
  "artworks/searchArtworks",
  async (searchString: string) => {
    const searchResponse = await axios
      .get<{
        data: Search[];
      }>(
        `/artworks/search?q=${searchString}&fields=${requestedSearchFields.join(",")}&limit=${SEARCH_LIMIT}`,
      )
      .then((r) => r.data.data);

    const ids = searchResponse.map((s) => s.id);

    const res = await axios
      .get<Artwork[]>(
        `/artworks?ids=${ids.join(",")}&fields=${requestedFields.join(",")}`,
      )
      .then((res) => res.data)
      .then((data) => {
        // @ts-ignore
        data.data["iiif_url"] = data["config"]["iiif_url"];
        return data;
      });

    // @ts-ignore
    return res["data"];
  },
);
