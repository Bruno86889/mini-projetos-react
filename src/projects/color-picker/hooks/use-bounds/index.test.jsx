import { render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it } from "vitest";
import useBounds from ".";

const expectedBounds = {
    x: 50,
    y: 100,
    width: 100,
    height: 100,
    top: 100,
    bottom: 100,
    left: 50,
    right: 150,
};

window.HTMLElement.prototype.getBoundingClientRect = () => expectedBounds;

function Component() {
    const ref = useRef();
    const bounds = useBounds(ref);

    return (
        <div ref={ref}>
            <p data-testid="x">{bounds?.x}</p>
            <p data-testid="y">{bounds?.y}</p>
            <p data-testid="width">{bounds?.width}</p>
            <p data-testid="height">{bounds?.height}</p>

            <p data-testid="top">{bounds?.top}</p>
            <p data-testid="bottom">{bounds?.bottom}</p>
            <p data-testid="left">{bounds?.left}</p>
            <p data-testid="right">{bounds?.right}</p>
        </div>
    );
}

describe("UseBounds hook", async () => {
    window.innerWidth = 300;
    window.innerHeight = 300;

    const { findByTestId } = render(<Component />);
    const x = await findByTestId("x");
    const y = await findByTestId("y");
    const width = await findByTestId("width");
    const height = await findByTestId("height");

    const top = await findByTestId("top");
    const bottom = await findByTestId("bottom");
    const left = await findByTestId("left");
    const right = await findByTestId("right");

    const getElementValue = (element) => parseInt(element.innerHTML);

    it("should return the component bounds", () => {
        const bounds = {
            x: getElementValue(x),
            y: getElementValue(y),
            width: getElementValue(width),
            height: getElementValue(height),
            top: getElementValue(top),
            bottom: getElementValue(bottom),
            left: getElementValue(left),
            right: getElementValue(right),
        };

        expect(bounds).toEqual(expectedBounds);
    });
});
