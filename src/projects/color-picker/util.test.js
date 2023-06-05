import { describe, expect, test } from "vitest";
import { calculateOffset, clamp, percent } from "./util";

describe("Utilities", () => {
    test("clamp between min and max", () => {
        const MIN = 0;
        const MAX = 100;

        expect(clamp(150, MIN, MAX)).toBe(100);
        expect(clamp(-50, MIN, MAX)).toBe(0);
        expect(clamp(50, MIN, MAX)).toBe(50);
    });

    test("calculate the offset between two values", () => {
        const VALUE = 100;
        const POSITION = 50;
        const WIDTH = 200;

        expect(calculateOffset(VALUE, POSITION, 0, WIDTH)).toBe(50);
    });

    test("calculate the percentage value", () => {
        const MAX = 200;
        const VALUE = 100;
        expect(percent(VALUE, MAX)).toBe(50);
    });
});
