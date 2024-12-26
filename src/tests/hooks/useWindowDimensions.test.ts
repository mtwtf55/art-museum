import { act, fireEvent, renderHook } from "@testing-library/react";
import { useWindowDimensions } from "@Utils/hooks/useWindowDimensions";

const INITIAL_WINDOW_DIMENSIONS = [100, 100];
const RESIZED_WINDOW_DIMENSIONS = [120, 120];

function defineWindowDimensions(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { value: width });
  Object.defineProperty(window, "innerHeight", { value: height });
}

describe(useWindowDimensions.name, () => {
  beforeAll(() => {
    defineWindowDimensions(
      INITIAL_WINDOW_DIMENSIONS[0],
      INITIAL_WINDOW_DIMENSIONS[1],
    );

    window.onresize = jest.fn(() => {
      defineWindowDimensions(
        RESIZED_WINDOW_DIMENSIONS[0],
        RESIZED_WINDOW_DIMENSIONS[1],
      );
    });
  });

  it("should return correct window dimensions", () => {
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current.width).toBe(INITIAL_WINDOW_DIMENSIONS[0]);
    expect(result.current.height).toBe(INITIAL_WINDOW_DIMENSIONS[1]);
  });

  it("should return updated window dimensions on resize event", () => {
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current.width).toBe(INITIAL_WINDOW_DIMENSIONS[0]);
    expect(result.current.height).toBe(INITIAL_WINDOW_DIMENSIONS[1]);

    act(() => {
      fireEvent(window, new Event("resize"));
    });

    expect(result.current.width).toBe(RESIZED_WINDOW_DIMENSIONS[0]);
    expect(result.current.height).toBe(RESIZED_WINDOW_DIMENSIONS[1]);
  });
});
