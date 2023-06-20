import { describe, expect, it } from "vitest";
import { hexToRGB, hslToRGB, hsvToRGB, rgbToHSL, rgbToHSV, rgbToHex } from ".";

describe("Color utilities", () => {
    const blueExampleColor = {
        hex: "#00bfff",
        hsl: {
            h: 195,
            s: 100,
            l: 50,
        },
        rgb: {
            r: 0,
            g: 191,
            b: 255,
        },
        hsv: {
            h: 195,
            s: 100,
            v: 100,
        },
    };

    const { hex, hsl, hsv, rgb } = blueExampleColor;

    it("should convert rgb color to hexadecimal", () => {
        expect(rgbToHex(rgb)).toEqual(hex);
    });

    it("shoudl convert rgb color to hsv", () => {
        expect(rgbToHSV(rgb)).toEqual(hsv);
    });
    it("should convert rgb color to hsl", () => {
        expect(rgbToHSL(rgb)).toEqual(hsl);
    });

    it("should convert hex color to rgb", () => {
        expect(hexToRGB(hex)).toEqual(rgb);
    });
    it("should convert hex color to rgb if the hex color starts with '#'", () => {
        expect(hexToRGB(hex)).toEqual(rgb);
    });

    it("should convert hsl color to rgb", () => {
        expect(hslToRGB(hsl)).toEqual(rgb);
    });

    it("should convert hsv color to rgb", () => {
        expect(hsvToRGB(hsv)).toEqual(rgb);
    });
});
