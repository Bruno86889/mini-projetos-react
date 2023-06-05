export default function hslToRGB({ h, s, l }) {
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
