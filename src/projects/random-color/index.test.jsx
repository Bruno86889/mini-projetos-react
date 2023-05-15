import { render } from "@testing-library/react";
import { test } from "vitest";
import RandomColor from ".";

test("should render the whole project page", () => {
    render(<RandomColor />);
});
