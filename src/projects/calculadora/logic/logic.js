const isWillCauseZeroError = (value, operator) =>
    operator === "/" && value === "0";

const isToCalculateSubresult = (isOperating, value) => isOperating && value;

const isToReplaceStartZero = (value, digit) => value === "0" && digit !== "0";

const isToBlockInsertZero = (value, digit) => value === "0" && digit === "0";

export const validators = {
    isWillCauseZeroError,
    isToCalculateSubresult,
    isToReplaceStartZero,
    isToBlockInsertZero,
};

export const calculate = (operand, operator, secondaValue = "") =>
    eval(operand.concat(operator, secondaValue)).toString();
