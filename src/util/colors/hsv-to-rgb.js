export default function hsvToRGB({ h, s, v }) {
    s /= 100;
    v /= 100;

    const c = v * s;

    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));

    const m = v - c;

    let auxR, auxG, auxB;

    if (h >= 0 && h < 60) {
        auxR = c;
        auxG = x;
        auxB = 0;
    }

    if (h >= 60 && h < 120) {
        auxR = x;
        auxG = c;
        auxB = 0;
    }

    if (h >= 120 && h < 180) {
        auxR = 0;
        auxG = c;
        auxB = x;
    }

    if (h >= 180 && h < 240) {
        auxR = 0;
        auxG = x;
        auxB = c;
    }

    if (h >= 240 && h < 300) {
        auxR = x;
        auxG = 0;
        auxB = c;
    }

    if (h >= 300 && h <= 360) {
        auxR = c;
        auxG = 0;
        auxB = x;
    }

    const r = Math.floor((auxR + m) * 255);
    const g = Math.floor((auxG + m) * 255);
    const b = Math.floor((auxB + m) * 255);

    return { r, g, b };
}
