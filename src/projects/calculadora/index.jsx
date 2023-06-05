import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useReducer } from "react";
import { actions, calculatorState, reducer } from "./logic";

import "./style.scss";

export default function Calculator() {
    return (
        <div className="calculator">
            <App />
        </div>
    );
}

function App() {
    const [state, dispatch] = useReducer(reducer, calculatorState.CLEARED);

    const mainDisplay = state?.currentValue;
    const subDisplay = `${state?.operand} ${state?.operator}`;

    return (
        <div className="app">
            <Display mainDisplay={mainDisplay} subDisplay={subDisplay} />
            <Keyboard dispatch={dispatch} />
        </div>
    );
}

function Display({ mainDisplay, subDisplay }) {
    return (
        <div className="calculator__display">
            <div className="sub">{subDisplay}</div>
            <div className="main">{mainDisplay}</div>
        </div>
    );
}

const Keyboard = memo(function Keyboard({ dispatch }) {
    const addNumber = (digit) =>
        dispatch({ type: actions.NUMBER, payload: digit });
    const addOperation = (digit) =>
        dispatch({ type: actions.OPERATION, payload: digit });
    const addDecimal = () => dispatch({ type: actions.DECIMAL });
    const backspace = () => dispatch({ type: actions.BACKSPACE });
    const calculate = () => dispatch({ type: actions.CALCULATE });
    const clear = () => dispatch({ type: actions.CLEAR });

    return (
        <div className="calculator__keyboard">
            <CalculatorButton digit="C" action={clear} variant="operation" />
            <CalculatorButton
                digit="*"
                action={addOperation}
                variant="operation"
            />
            <CalculatorButton
                digit="/"
                action={addOperation}
                variant="operation"
            />
            <CalculatorButton action={backspace} variant="operation">
                <FontAwesomeIcon icon={faBackspace} />
            </CalculatorButton>

            <CalculatorButton digit="7" action={addNumber} />
            <CalculatorButton digit="8" action={addNumber} />
            <CalculatorButton digit="9" action={addNumber} />
            <CalculatorButton
                digit="+"
                action={addOperation}
                variant="operation"
            />

            <CalculatorButton digit="4" action={addNumber} />
            <CalculatorButton digit="5" action={addNumber} />
            <CalculatorButton digit="6" action={addNumber} />
            <CalculatorButton
                digit="-"
                action={addOperation}
                variant="operation"
            />

            <CalculatorButton digit="1" action={addNumber} />
            <CalculatorButton digit="2" action={addNumber} />
            <CalculatorButton digit="3" action={addNumber} />

            <CalculatorButton digit="0" action={addNumber} variant="zero" />
            <CalculatorButton digit="." action={addDecimal} />

            <CalculatorButton digit="=" action={calculate} variant="equal" />
        </div>
    );
});

const CalculatorButton = ({ digit = "", action, children, variant }) => {
    const variants = {
        equal: "calculator__btn--equal",
        operation: "calculator__btn--operation",
        zero: "calculator__btn--zero",
    };
    return (
        <button
            className={`btn calculator__btn ${
                variant ? variants[variant] : ""
            }`}
            onClick={() => action?.(digit)}
        >
            {digit || children}
        </button>
    );
};
