import { Artwork } from "@Types";

export function filterArtworksWithImages(artworks: Artwork[]) {
  return artworks.filter((artwork) => artwork.image_id);
}
