import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import useSliderPosition from ".";

const elementBounds = { width: 100, height: 300, x: 0, y: 0 };

const MAX_VALUE = 200;
const INITIAL_VALUE = 10;
const STEP = 10;

function Component({ isVertical = false, isReverse = false }) {
    const [value, setValue] = useState(INITIAL_VALUE);

    const { position, onPositionChange } = useSliderPosition({
        valueMax: MAX_VALUE,
        elementBounds,
        value,
        isReverse,
        isVertical,
        onChange: (val) => setValue(val),
    });

    const valueUp = () => setValue((val) => val + STEP);

    return (
        <div>
            <button onClick={valueUp}>up</button>
            <p data-testid="position">{position}</p>

            <div
                role="slider"
                onKeyDown={null}
                aria-valuenow={value}
                onMouseMove={onPositionChange}
                tabIndex={0}
            >
                <div data-testid="value">{value}</div>
            </div>
        </div>
    );
}

const getConstants = (isVertical) => {
    const elementSize = isVertical ? elementBounds.height : elementBounds.width;

    const valueToPosition = elementSize / MAX_VALUE;
    const positionToValue = MAX_VALUE / elementSize;

    return { valueToPosition, positionToValue };
};

describe("useSliderPosition hook", () => {
    describe("Horizontal", () => {
        const { getByTestId, getByText } = render(<Component />);

        const buttonValueUp = getByText("up");
        const sliderTrack = getByTestId("value");
        const positionElement = getByTestId("position");
        const valueElement = getByTestId("value");

        const { positionToValue, valueToPosition } = getConstants(false);
        const getActualValue = () => parseInt(valueElement.innerHTML);
        const getActualPosition = () => parseInt(positionElement.innerHTML);

        it("should calculate the actual position of bullet bassed of current value", () => {
            const position = getActualPosition();
            const value = getActualValue();
            expect(position).toBe(value * valueToPosition);
        });

        it("should calculate the actual position when the value changes", async () => {
            act(() => fireEvent.click(buttonValueUp));

            const value = getActualValue();
            const position = getActualPosition();

            expect(position).toBe(value * valueToPosition);
        });

        it("should calculate the value based of the mouse position", async () => {
            fireEvent.mouseMove(sliderTrack, { clientX: 50 });

            const position = getActualPosition();
            const value = getActualValue();

            expect(value).toBe(position * positionToValue);
        });
    });
});
