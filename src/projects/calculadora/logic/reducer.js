import { MAX_DIGITS, calculatorState } from "./constants";
import { calculate, validators } from "./logic";

// /**
//  * @param {{currentValue: string,operand: string, operator: string, lastOperation:string,isOperating: boolean,hasCalculated: boolean, hasError: boolean}} state
//  * @param {{type: "clear" | "backspace" | "decimal" | "number" | "operation" | "calculate", payload: string}} action
//  */
export function reducer(state, action) {
    const { type, payload: digit } = action;

    if (state.hasError) state = calculatorState.CLEARED;

    let {
        currentValue,
        operator,
        operand,
        lastOperation,
        isOperating,
        hasCalculated,
    } = state;

    switch (type) {
        case "clear":
            return {
                ...calculatorState.CLEARED,
                lastOperation,
            };

        case "backspace":
            if (currentValue === "") return state;
            return {
                ...state,
                currentValue: currentValue.slice(0, -1),
                isExedingMaxDigits: false,
            };

        case "decimal":
            // more than one decimal point are ignored
            if (currentValue.includes(".")) return state;

            // append zero if decimal is the first
            if (!currentValue) return { ...state, currentValue: "0." };

            return { ...state, currentValue: currentValue.concat(".") };

        case "number":
            // clear the value after calculate an result
            if (hasCalculated)
                return { ...state, currentValue: digit, hasCalculated: false };

            if (currentValue.length === MAX_DIGITS)
                return { ...state, isExedingMaxDigits: true };

            if (validators.isToReplaceStartZero(currentValue, digit))
                return { ...state, currentValue: digit };

            if (validators.isToBlockInsertZero(currentValue, digit))
                return state;

            return { ...state, currentValue: currentValue.concat(digit) };

        case "operation":
            if (!currentValue && !operand) return state;

            if (validators.isToCalculateSubresult(isOperating, currentValue)) {
                if (validators.isWillCauseZeroError(currentValue, operator))
                    return calculatorState.ZERO_ERROR;

                return {
                    ...state,
                    currentValue: "",
                    operand: calculate(operand, operator, currentValue),
                    lastOperation: operator.concat(currentValue),
                    operator: digit,
                    isOperating: true,
                };
            }

            if (isOperating) return { ...state, operator: digit };

            return {
                ...state,
                operand: currentValue,
                operator: digit,
                currentValue: "",
                isOperating: true,
            };

        case "calculate":
            if (!currentValue) return state;

            if (!lastOperation && !isOperating) return state;

            if (validators.isWillCauseZeroError(currentValue, operator))
                return calculatorState.ZERO_ERROR;

            if (!isOperating)
                return {
                    ...state,
                    currentValue: calculate(currentValue, lastOperation),
                    operand: "",
                    operator: "",
                    isOperating: false,
                    hasCalculated: true,
                };

            return {
                ...state,
                currentValue: calculate(operand, operator, currentValue),
                lastOperation: operator.concat(currentValue),
                operand: "",
                operator: "",
                isOperating: false,
                hasCalculated: true,
            };
    }
}
