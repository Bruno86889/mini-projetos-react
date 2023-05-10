import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useTitle from ".";

const Component = () => {
    useTitle("changed title");

    return <div>Title Changed</div>;
};

describe("UseTitle hook", () => {
    document.title = "original title";
    const { unmount } = render(<Component />);

    it("should change the document title on the component mount", () => {
        expect(document.title).toBe("changed title");
    });

    it("should change the page title to original title on the component unmount", () => {
        unmount();

        expect(document.title).toBe("original title");
    });
});
