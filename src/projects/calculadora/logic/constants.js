export const calculatorState = {
    CLEARED: {
        currentValue: "",
        operand: "",
        operator: "",
        lastOperation: "",
        isOperating: false,
        hasError: false,
        hasCalculated: false,
        isExedingMaxDigits: false,
    },
    ZERO_ERROR: {
        currentValue: "Não é possível dividir por 0",
        operand: "",
        operator: "",
        lastOperation: "",
        isOperating: false,
        hasError: true,
        hasCalculated: false,
        isExedingMaxDigits: false,
    },
};

export const MAX_DIGITS = 15;
