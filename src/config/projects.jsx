import Calculator from "@/projects/calculadora";
import RandomColor from "@/projects/random-color";

export default [
    {
        name: "Cor aleatória",
        description: "Gera uma cor aleatória toda vez que o botão é clicado.",
        foldername: "random-color",
        route: {
            path: "cor-aleatoria",
            element: <RandomColor />,
        },
    },
    {
        name: "Calculadora",
        description: "Uma calculadora simples e funcional.",
        foldername: "calculadora",
        route: {
            path: "calculadora",
            element: <Calculator />,
        },
    },
];
