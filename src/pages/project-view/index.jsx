import { Outlet } from "react-router-dom";
import "./style.scss";

export default function ProjectView() {
    return (
        <main className="project-view">
            <Outlet />
        </main>
    );
}
