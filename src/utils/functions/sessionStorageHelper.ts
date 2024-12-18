type SessionStorageHelper = {
  getValidArtworksIds: () => string[];
  has: (artworkId: number) => boolean;
  add: (artworkId: number, title: string) => void;
  remove: (artworkId: number) => void;
};

export function sessionStorageHelper(): SessionStorageHelper {
  function getValidArtworksIds() {
    return Object.keys(sessionStorage).filter((k) => !isNaN(Number(k)));
  }

  function has(artworkId: number) {
    return sessionStorage.getItem(artworkId.toString()) !== null;
  }

  function add(artworkId: number, title: string) {
    sessionStorage.setItem(artworkId.toString(), title);
  }

  function remove(artworkId: number) {
    sessionStorage.removeItem(artworkId.toString());
  }

  return { getValidArtworksIds, has, add, remove };
}
