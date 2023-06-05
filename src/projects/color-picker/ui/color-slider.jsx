import { useRef } from "react";
import useBounds from "../hooks/use-bounds";
import useHold from "../hooks/use-hold";
import useSliderPosition from "../hooks/use-slider-position";
import ColorSliderBullet from "./color-slider-bullet";

export default function ColorSlider({
    color,
    min = 0,
    max,
    value,
    onChange,
    onDown,
    onUp,
}) {
    const trackRef = useRef(null);
    const bounds = useBounds(trackRef);
    const isHolding = useHold(trackRef);

    const { onPositionChange: handlePositionChange, position: x } =
        useSliderPosition({
            elementBounds: bounds,
            onChange,
            valueMax: max,
            value,
        });

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                onDown?.();
                break;
            case "ArrowRight":
                onUp?.();
                break;
        }
    };

    const onMove = (event) => isHolding && handlePositionChange(event);
    return (
        <div
            ref={trackRef}
            role="slider"
            aria-label="color-slider"
            tabIndex={0}
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            onClick={handlePositionChange}
            onMouseMove={onMove}
            onTouchMove={onMove}
            onKeyDown={handleKeyDown}
            className="color_picker__slider"
            style={{ position: "relative" }}
        >
            <ColorSliderBullet x={`${x}%`} color={color} />
        </div>
    );
}
