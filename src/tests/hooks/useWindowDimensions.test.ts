import { act, fireEvent, renderHook } from "@testing-library/react";
import { useWindowDimensions } from "@Utils/hooks/useWindowDimensions";

function defineWindowDimensions(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { value: width });
  Object.defineProperty(window, "innerHeight", { value: height });
}

describe(useWindowDimensions.name, () => {
  beforeAll(() => {
    defineWindowDimensions(100, 100);

    window.onresize = jest.fn(() => {
      defineWindowDimensions(120, 120);
    });
  });

  it("should return correct window dimensions", () => {
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current.width).toBe(100);
    expect(result.current.height).toBe(100);
  });

  it("should return updated window dimensions on resize event", () => {
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current.width).toBe(100);
    expect(result.current.height).toBe(100);

    act(() => {
      fireEvent(window, new Event("resize"));
    });

    expect(result.current.width).toBe(120);
    expect(result.current.height).toBe(120);
  });
});
