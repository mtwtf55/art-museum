import {
  SessionStorageHelper,
  sessionStorageHelper,
} from "../../utils/functions/sessionStorageHelper";

const SESSION_STORAGE_DUMMY_DATA = {
  "1": "TItle1",
  "2": "TItle2",
  invalidId: "TItle3",
  "3": "TItle4",
};

function polluteSessionStorage() {
  Object.entries(SESSION_STORAGE_DUMMY_DATA).forEach((e) => {
    sessionStorage.setItem(e[0], e[1]);
  });
}

describe(sessionStorageHelper.name, () => {
  let storageHelper: SessionStorageHelper;

  beforeAll(() => {
    storageHelper = sessionStorageHelper();
  });

  describe("test has function", () => {
    beforeEach(() => {
      polluteSessionStorage();
    });

    afterEach(() => {
      sessionStorage.clear();
    });

    it("should return false for null or undefined id", () => {
      expect(storageHelper.has(null)).toBe(false);
      expect(storageHelper.has(undefined)).toBe(false);
    });

    it("should return true for value that exist", () => {
      expect(storageHelper.has(1)).toBe(true);
    });

    it("should return false for value that doesnt exist", () => {
      expect(storageHelper.has(-1)).toBe(false);
    });
  });

  describe("test add function", () => {
    afterEach(() => {
      sessionStorage.clear();
    });

    it("should add nothing if id is undefined", () => {
      storageHelper.add(undefined, "Title");
      expect(sessionStorage.length).toBe(0);
    });

    it("should add entry", () => {
      storageHelper.add(1, "Title");
      expect(sessionStorage.length).toBe(1);
    });
  });

  describe("test remove function", () => {
    let lengthBefore: number;

    beforeEach(() => {
      polluteSessionStorage();
      lengthBefore = sessionStorage.length;
    });

    afterEach(() => {
      sessionStorage.clear();
    });

    it("should do nothing if id is undefined", () => {
      storageHelper.remove(undefined);
      expect(sessionStorage.length).toBe(lengthBefore);
    });

    it("should remove item if id exists", () => {
      storageHelper.remove(1);
      expect(sessionStorage.length).not.toBe(lengthBefore);
    });

    it("should do nothing for invalid id", () => {
      storageHelper.remove(-1);
      expect(sessionStorage.length).toBe(lengthBefore);
    });
  });

  describe("test getValidArtworksIds function", () => {
    beforeEach(() => {
      polluteSessionStorage();
    });

    afterEach(() => {
      sessionStorage.clear();
    });

    it("should return valid ids", () => {
      expect(storageHelper.getValidArtworksIds().length).toBe(3);
    });
  });
});
