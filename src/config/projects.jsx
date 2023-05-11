import ProjectExample from "@/projects/exemplo";

export default [
    {
        name: "Exemplo de projeto",
        description: "Um exemplo de como será mostrado um projeto.",
        foldername: "exemplo",
        route: {
            path: "exemplo",
            element: <ProjectExample />,
        },
    },
];
