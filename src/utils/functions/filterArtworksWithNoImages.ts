import { Artwork } from "@Types/types";

export default function filterArtworksWithImages(artworks: Artwork[]) {
  return artworks.filter((artwork) => artwork.image_id);
}
