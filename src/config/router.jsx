import projects from "@/config/projects";
import HomePage from "@/pages/home";
import ProjectView from "@/pages/project-view";
import extractRouteData from "@/util/extract-route-data";
import { createBrowserRouter } from "react-router-dom";
import { BASE_PROJECT_ROUTE } from "./constants";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: BASE_PROJECT_ROUTE,
        element: <ProjectView />,
        children: [...extractRouteData(projects)],
    },
]);

export default router;
