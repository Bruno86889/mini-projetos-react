import { describe, expect, it } from "vitest";
import {
    convertHSLToRGB,
    convertRGBToHexadecimal,
    generateRandomHSLColor,
} from "./util";

describe("Random color utilities", () => {
    it("should generate a random hsl color on each function call", () => {
        const firstCall = generateRandomHSLColor();
        const secondCall = generateRandomHSLColor();

        expect(firstCall).not.toEqual(secondCall);
    });

    // color from https://www.w3schools.com/colors/colors_converter.asp
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
    };

    it("should convert a hsl color object to rgb color object", () => {
        const blueRGB = convertHSLToRGB(blueExampleColor.hsl);
        expect(blueRGB).toEqual(blueExampleColor.rgb);
    });

    it("should convert a rgb object to hexadecimal 6 digits color string", () => {
        expect(convertRGBToHexadecimal(blueExampleColor.rgb)).toBe(
            blueExampleColor.hex
        );
    });
});
