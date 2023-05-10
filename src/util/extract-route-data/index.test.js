import { describe, expect, it } from "vitest";
import extractRouteData from ".";

const projectMetadata = [
    {
        name: "first",
        description: "first project",
        route: {
            path: "/",
            loader: () => ({ foo: "bar" }),
        },
    },
];

describe("ExtractRoutes function utility", () => {
    const extractedRoutes = extractRouteData(projectMetadata);

    it("should extract the routes", () => {
        const { path, element, loader } = extractedRoutes[0];

        expect(path).toBe("/");
        expect(element).toBe(undefined);
        expect(loader).toBeTypeOf("function");
    });

    it("should return the loader data of project metadata and the property 'title'", () => {
        const { loader } = extractedRoutes[0];
        expect(loader()).toEqual({ title: "first", foo: "bar" });
    });
});
