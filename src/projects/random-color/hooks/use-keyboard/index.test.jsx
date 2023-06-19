import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import useKeyboard from ".";

const Component = () => {
    const [counter, setCounter] = useState(0);
    const counterUp = () => setCounter(1);

    useKeyboard({ key: "Backspace", listener: counterUp });

    return <div data-testid="counter">{counter}</div>;
};

describe("useKeyboard hook", () => {
    const { getByTestId } = render(<Component />);
    const counter = getByTestId("counter");

    it("should call the listener when a specific key is pressed", async () => {
        await user.keyboard("{backspace}");
        expect(parseInt(counter.innerHTML)).toBe(1);
    });
});
