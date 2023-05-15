function generateRandomHSLColor() {
    const randomValue = (max) => Math.round(Math.random() * max);
    const h = randomValue(360);
    const s = randomValue(100);
    const l = randomValue(100);

    return { h, s, l };
}

function convertHSLToRGB({ h, s, l }) {
    // https://en.wikipedia.org/wiki/HSL_and_HSV

    const { min, max } = Math;

    const light = l / 100;
    const saturation = s / 100;

    const a = saturation * min(light, 1 - light);
    let k = (n) => (n + h / 30) % 12;

    if (k < 0) k = 0;

    const fn = (n) => light - a * max(-1, min(k(n) - 3, min(9 - k(n), 1)));

    const calculate = (n) => Math.floor(fn(n) * 255);
    const r = calculate(0);
    const g = calculate(8);
    const b = calculate(4);

    return { r, g, b };
}

function convertRGBToHexadecimal({ r, g, b }) {
    const fn = (color) => {
        let hex = color.toString(16);

        if (hex.length < 2) hex = hex.concat("0");

        return hex;
    };

    return `#${fn(r)}${fn(g)}${fn(b)}`;
}

export { convertHSLToRGB, convertRGBToHexadecimal, generateRandomHSLColor };
