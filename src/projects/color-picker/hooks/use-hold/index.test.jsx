import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it } from "vitest";
import useHold from ".";

function Component() {
    const ref = useRef();
    const isHolding = useHold(ref);
    return (
        <button ref={ref} data-testid="btn">
            {isHolding ? "holding" : "not holding"}
        </button>
    );
}

describe("UseDrag hook", async () => {
    const { findByTestId } = render(<Component />);
    const btn = await findByTestId("btn");

    it("should return true when user hold the element on mouse event", () => {
        fireEvent.mouseDown(btn);
        expect(btn.innerHTML).toBe("holding");
    });

    it("should return true when user hold the element on mouse event", () => {
        fireEvent.touchStart(btn);
        expect(btn.innerHTML).toBe("holding");
    });

    it("should return false when user release the element on mouse event", () => {
        fireEvent.mouseUp(btn);
        expect(btn.innerHTML).toBe("not holding");
    });

    it("should return false when user release the element on touch event", () => {
        fireEvent.touchEnd(btn);
        expect(btn.innerHTML).toBe("not holding");
    });
});
