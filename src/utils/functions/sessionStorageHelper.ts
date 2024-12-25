export type SessionStorageHelper = {
  getValidArtworksIds: () => string[];
  has: (artworkId: number | null | undefined) => boolean;
  add: (artworkId: number | undefined, title: string) => void;
  remove: (artworkId: number | undefined) => void;
};

export function sessionStorageHelper(): SessionStorageHelper {
  function getValidArtworksIds() {
    return Object.keys(sessionStorage).filter((k) => !isNaN(Number(k)));
  }

  function has(artworkId: number | null | undefined) {
    if (artworkId === null || artworkId === undefined) return false;
    return sessionStorage.getItem(artworkId.toString()) !== null;
  }

  function add(artworkId: number | undefined, title: string) {
    if (artworkId === undefined) return;
    sessionStorage.setItem(artworkId.toString(), title);
  }

  function remove(artworkId: number | undefined) {
    if (artworkId === undefined) return;
    sessionStorage.removeItem(artworkId.toString());
  }

  return { getValidArtworksIds, has, add, remove };
}
