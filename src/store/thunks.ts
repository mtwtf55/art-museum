import { createAppAsyncThunk } from "../withTypes";
import axios from "axios";
import { Artwork } from "../types/types";

axios.defaults.baseURL = "https://api.artic.edu/api/v1";
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