export type Artwork = {
  id: number;
  title: string;
  dimensions: string;
  artist_id: number;
  artist_title: string;
  image_id: string;
  date_display: string;
  credit_line: string;
  is_public_domain: boolean;
  gallery_id: number;
  gallery_title: string;
  place_of_origin: string;
  alt_image_ids: string[];
};

export type Search = {
  api_link: string;
  id: number;
  title: string;
};
