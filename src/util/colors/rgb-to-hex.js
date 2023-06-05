export default function rgbToHex({ r, g, b }) {
    const fn = (color) => {
        let hex = color.toString(16);

        if (hex.length < 2) hex = "0".concat(hex);

        return hex;
    };

    return `${fn(r)}${fn(g)}${fn(b)}`;
}
