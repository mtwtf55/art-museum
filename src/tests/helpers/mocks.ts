import { faker } from "@faker-js/faker";
import { Artwork } from "@Types/types";

export function mockArtwork(): Artwork {
  return {
    id: faker.number.int(),
    image_id: faker.string.uuid(),
    is_public_domain: true,
    title: faker.hacker.phrase(),
    artist_title: faker.person.fullName(),
    gallery_id: faker.number.int(),
    artist_id: faker.number.int(),
    alt_image_ids: [],
    date_display: faker.date.anytime().toDateString(),
    dimensions: faker.word.words(4),
    credit_line: faker.word.words(4),
    place_of_origin: faker.location.country(),
    gallery_title: faker.word.noun(),
  };
}
