import { describe, expect, it, test } from "vitest";
import { checkContrast, randomHSVcolor } from "./util";

describe("Utilities", () => {
    test("should generate a object", () => {
        const hsv = randomHSVcolor();
        const { h, s, v } = hsv;

        expect(h).not.toBeUndefined();
        expect(s).not.toBeUndefined();
        expect(v).not.toBeUndefined();
    });

    describe("check the color contrast", () => {
        const BLACK = "#000";
        const WHITE = "#FFF";

        it("should return BLACK when hue is greatter or equal to 50 and lower or equal to 200", () => {
            expect(checkContrast({ h: 50, v: 100 })).toBe(BLACK);
            expect(checkContrast({ h: 100, v: 100 })).toBe(BLACK);
            expect(checkContrast({ h: 200, v: 100 })).toBe(BLACK);
        });

        it("should return WHITE if value lower or equal than 70", () => {
            expect(checkContrast({ h: 60, v: 20 })).toBe(WHITE);
            expect(checkContrast({ h: 100, v: 70 })).toBe(WHITE);
            expect(checkContrast({ h: 200, v: 50 })).toBe(WHITE);
        });

        it("should return WHITE otherwise", () => {
            expect(checkContrast({ h: 10 })).toBe(WHITE);
            expect(checkContrast({ h: 250 })).toBe(WHITE);
            expect(checkContrast({ h: 360 })).toBe(WHITE);
        });
    });
});
