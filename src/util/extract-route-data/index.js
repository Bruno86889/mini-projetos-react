/**
 * Extract an route object from the project metadata to be
 * used by the react-router
 * @param {{name: string, description: string, route:{
 * path: string,
 * element: JSX.Element,
 * loader?: ()=> any}}} projectsData
 * @returns {{path: string, element: JSX.Element, loader: ()=> {title:string}}[]}
 */
export default function extractRouteData(projectsData) {
    return projectsData.reduce((acc, projectData) => {
        const { name } = projectData;
        const { path, element, loader: projectLoader } = projectData.route;

        const loader = () => ({
            title: name,
            ...projectLoader?.(),
        });

        return [...acc, { path, element, loader }];
    }, []);
}
