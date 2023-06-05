/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRef } from "react";
import useBounds from "../hooks/use-bounds";
import useHold from "../hooks/use-hold";
import useSliderPosition from "../hooks/use-slider-position";
import ColorSliderBullet from "./color-slider-bullet";

export default function ColorBoard({
    color,
    hue,
    value,
    onValueUp,
    onValueDown,
    max,
    onChange,
}) {
    const boardRef = useRef(null);
    const bounds = useBounds(boardRef);
    const isHolding = useHold(boardRef);

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                onValueDown?.x();
                break;
            case "ArrowRight":
                onValueUp?.x();
                break;
            case "ArrowUp":
                onValueUp?.y();
                break;
            case "ArrowDown":
                onValueDown?.y();
                break;
        }
    };

    const { position: x, onPositionChange: onChangeX } = useSliderPosition({
        elementBounds: bounds,
        valueMax: max?.x,
        value: value?.x,
        onChange: onChange?.x,
    });

    const { position: y, onPositionChange: onChangeY } = useSliderPosition({
        elementBounds: bounds,
        valueMax: max?.y,
        value: value?.y,
        isReverse: true,
        isVertical: true,
        onChange: onChange?.y,
    });

    const handlePositionChange = (event) => {
        onChangeX?.(event);
        onChangeY?.(event);
    };

    const handleMove = (event) => isHolding && handlePositionChange(event);

    const background = `linear-gradient(to bottom, transparent, black), linear-gradient(to right, white, transparent), hsl(${hue}deg, 100%, 50%)`;

    return (
        <figure
            ref={boardRef}
            className="color_picker__board"
            onClick={handlePositionChange}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onKeyDown={handleKeyDown}
            style={{ background }}
            tabIndex={0}
        >
            <ColorSliderBullet x={`${x}%`} y={`${y}%`} color={color} />
        </figure>
    );
}
