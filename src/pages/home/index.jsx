import ProjectCard from "@/components/project-card";
import { BASE_PROJECT_ROUTE } from "@/config/constants";
import projects from "@/config/projects";
import "./style.scss";

export default function HomePage() {
    return (
        <main>
            <section className="projects">
                <h1>Mini Projetos React</h1>
                <ul className="project-list">
                    {projects.map((project, key) => {
                        return (
                            <ProjectCard
                                key={key}
                                {...project}
                                path={`${BASE_PROJECT_ROUTE}/${project.route.path}`}
                            />
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}
