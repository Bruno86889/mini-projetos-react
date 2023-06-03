export default function rgbToHSV({ r, g, b }) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const difference = max - min;

    let h, s, v;

    v = max;

    if (max === 0) {
        s = 0;
    } else {
        s = difference / max;
    }

    if (difference === 0) h = 0;

    switch (max) {
        case r:
            h = 60 * ((g - b / difference) % 6);
            break;
        case g:
            h = 60 * (b - r / difference + 2);
            break;
        case b:
            h = 60 * (r - g / difference + 4);
            break;
    }
    h = Math.floor(h);
    s *= 100;
    v *= 100;
    return { h, s, v };
}
