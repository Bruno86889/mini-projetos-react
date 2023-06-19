const randomHSVcolor = () => {
    const randomValue = (max) => Math.round(Math.random() * max);
    const h = randomValue(360);
    const s = randomValue(100);
    const v = randomValue(100);

    return { h, s, v };
};

const checkContrast = (hsvColor) => {
    const { h = 0, v = 0 } = hsvColor;

    const BLACK = "#000";
    const WHITE = "#FFF";

    let contrast = WHITE;

    // check if the hue is in yellow, green or cyan range
    const isHueALightColor = h >= 50 && h <= 200;
    const isValueLow = v <= 70;

    if (isHueALightColor) contrast = BLACK;
    if (isHueALightColor && isValueLow) contrast = WHITE;

    return contrast;
};

export { checkContrast, randomHSVcolor };
