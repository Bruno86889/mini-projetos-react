import { Link } from "react-router-dom";
import "./style.scss";

export default function ProjectCard({ path, name, description }) {
    return (
        <li>
            <article className="project-card">
                <div className="project-card__body">
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
                <footer className="project-card__actions">
                    <Link to={path} className="btn btn__primary">
                        ver
                    </Link>
                </footer>
            </article>
        </li>
    );
}
