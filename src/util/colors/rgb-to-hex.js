export default function rgbToHex({ r, g, b }, isToOutputToCss = true) {
    const fn = (color) => {
        let hex = color.toString(16);

        if (hex.length < 2) hex = "0".concat(hex);

        return hex;
    };

    const hexadecimalColor = `${fn(r)}${fn(g)}${fn(b)}`;
    return isToOutputToCss ? "#" + hexadecimalColor : hexadecimalColor;
}
