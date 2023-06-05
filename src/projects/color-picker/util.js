const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const calculateOffset = (value, position, min = 0, max) =>
    clamp(value - position, min, max);

const percent = (value, max) => (value / max) * 100;

export { clamp, calculateOffset, percent };
