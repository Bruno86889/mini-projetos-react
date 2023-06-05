import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useSliderValue from ".";

describe("UseSliderValue Hook", () => {
    const max = 30;
    const min = 0;
    const step = 5;
    const initialValue = 5;
    const { result } = renderHook(() =>
        useSliderValue({
            min,
            max,
            step,
            initialValue,
        })
    );

    it("should start with the initial value", () => {
        expect(result.current.value).toBe(5);
    });

    it("should step up", () => {
        act(() => result.current.actions.stepUp());
        expect(result.current.value).toBe(10);
    });

    it("should step down", () => {
        act(() => result.current.actions.stepDown());
        expect(result.current.value).toBe(5);
    });

    it("should set the value", () => {
        act(() => result.current.actions.setValueAt(25));
        expect(result.current.value).toBe(25);
    });

    it("should not set the value greater that the max", () => {
        act(() => result.current.actions.setValueAt(50));
        expect(result.current.value).toBe(max);
    });

    it("should not step up grater that to the max", () => {
        act(() => result.current.actions.stepUp());
        expect(result.current.value).toBe(max);
    });

    it("should not set the value less that min", () => {
        act(() => result.current.actions.setValueAt(-5));
        expect(result.current.value).toBe(min);
    });

    it("should not step down less that min", () => {
        act(() => result.current.actions.stepDown());
        expect(result.current.value).toBe(min);
    });
});
