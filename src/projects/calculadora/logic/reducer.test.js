import { afterEach, describe, expect, it } from "vitest";
import { actions, calculatorState, reducer } from ".";
import { MAX_DIGITS } from "./constants";

let state = calculatorState.CLEARED;

const dispatch = ({ type, payload }) =>
    (state = reducer(state, { type, payload }));

describe("Calculator Reducer", () => {
    afterEach(() => (state = calculatorState.CLEARED));

    it("should add a number", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        expect(state.currentValue).toBe("1");
    });

    it("should add a number each time the action is called", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        dispatch({ type: actions.NUMBER, payload: "2" });

        expect(state.currentValue).toBe("12");
    });

    it("should not to be able to add more than one 0 on the start", () => {
        dispatch({ type: actions.NUMBER, payload: "0" });
        dispatch({ type: actions.NUMBER, payload: "0" });
        dispatch({ type: actions.NUMBER, payload: "0" });
        dispatch({ type: actions.NUMBER, payload: "0" });

        expect(state.currentValue).toBe("0");
    });

    it("should not to be able to add more than the max of digits", () => {
        for (let call = 0; call < MAX_DIGITS; call++) {
            dispatch({ type: actions.NUMBER, payload: "1" });
        }
        dispatch({ type: actions.NUMBER, payload: "1" });

        expect(state.currentValue.length).toBe(MAX_DIGITS);
        expect(state.isExedingMaxDigits).toBeTruthy();
    });

    it("should to replace the inital zero", () => {
        dispatch({ type: actions.NUMBER, payload: "0" });
        dispatch({ type: actions.NUMBER, payload: "1" });

        expect(state.currentValue).toBe("1");
    });

    it("should add the decimal point", () => {
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.DECIMAL });

        expect(state.currentValue).toBe("2.");
    });

    it("should not add the decimal point if the values already has one", () => {
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.DECIMAL });

        expect(state.currentValue).toBe("2.");

        dispatch({ type: actions.DECIMAL });

        expect(state.currentValue).toBe("2.");
    });

    it("should add the 0 in the inicial if the decimal point action is called", () => {
        dispatch({ type: actions.DECIMAL });
        expect(state.currentValue).toBe("0.");
    });

    it("should clear the display", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        dispatch({ type: actions.NUMBER, payload: "2" });

        expect(state.currentValue).toBe("12");

        dispatch({ type: actions.CLEAR });

        expect(state.currentValue).toBe("");
    });

    it("should remove the last digit", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        dispatch({ type: actions.NUMBER, payload: "2" });

        expect(state.currentValue).toBe("12");

        dispatch({ type: actions.BACKSPACE });
        expect(state.currentValue).toBe("1");
    });

    it("should add the operand digit", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.OPERATION, payload: "+" });

        expect(state.currentValue).toBe("");
        expect(state.isOperating).toBeTruthy();
        expect(state.operand).toBe("12");
        expect(state.operator).toBe("+");
    });

    it("should ignore when the operand action is called when the current value is empty", () => {
        dispatch({ type: actions.OPERATION, payload: "+" });

        expect(state.currentValue).toBe("");
        expect(state.isOperating).toBeFalsy();
        expect(state.operand).toBe("");
        expect(state.operator).toBe("");
    });

    it("should replace the operand digit if the operand actions is called and the current value is empty", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.OPERATION, payload: "+" });
        dispatch({ type: actions.OPERATION, payload: "-" });

        expect(state.currentValue).toBe("");
        expect(state.isOperating).toBeTruthy();
        expect(state.operand).toBe("12");
        expect(state.operator).toBe("-");
    });

    it("should calculate the result", () => {
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.OPERATION, payload: "+" });
        dispatch({ type: actions.NUMBER, payload: "3" });
        dispatch({ type: actions.CALCULATE });

        expect(state.currentValue).toBe("5");
        expect(state.lastOperation).toBe("+3");
        expect(state.operator).toBe("");
        expect(state.operand).toBe("");
        expect(state.hasCalculated).toBeTruthy();
    });

    it("should calculate the sub result when the has an operand and the current value", () => {
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.OPERATION, payload: "+" });
        dispatch({ type: actions.NUMBER, payload: "3" });

        dispatch({ type: actions.OPERATION, payload: "+" });

        expect(state.operand).toBe("5");
        expect(state.operator).toBe("+");
        expect(state.isOperating).toBeTruthy();
        expect(state.hasCalculated).toBeFalsy();
    });

    it("should calculate the result using the last operand if the current value is empty", () => {
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.OPERATION, payload: "+" });
        dispatch({ type: actions.NUMBER, payload: "3" });
        dispatch({ type: actions.CALCULATE });
        dispatch({ type: actions.CALCULATE });

        expect(state.currentValue).toBe("8");
        expect(state.lastOperation).toBe("+3");
        expect(state.operand).toBe("");
        expect(state.operator).toBe("");
        expect(state.isOperating).toBeFalsy();
        expect(state.hasCalculated).toBeTruthy();
    });

    it("should replace the result of the last calc when add a new number", () => {
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.OPERATION, payload: "+" });
        dispatch({ type: actions.NUMBER, payload: "3" });
        dispatch({ type: actions.CALCULATE });

        dispatch({ type: actions.NUMBER, payload: "2" });

        expect(state.currentValue).toBe("2");
        expect(state.isOperating).toBeFalsy();
        expect(state.operand).toBe("");
        expect(state.operator).toBe("");
        expect(state.hasCalculated).toBeFalsy();
    });

    it("should ignore if the current value is empty and last value is empty too", () => {
        dispatch({ type: actions.NUMBER, payload: "2" });
        dispatch({ type: actions.CALCULATE });

        expect(state.currentValue).toBe("2");
        expect(state.lastOperation).toBe("");
        expect(state.isOperating).toBeFalsy();
        expect(state.operand).toBe("");
        expect(state.operator).toBe("");
    });

    it("should alert an error on 0 division", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        dispatch({ type: actions.OPERATION, payload: "/" });
        dispatch({ type: actions.NUMBER, payload: "0" });
        dispatch({ type: actions.CALCULATE });

        expect(state.hasError).toBeTruthy();
        expect(state.currentValue).toBe("Não é possível dividir por 0");
        expect(state.operand).toBe("");
        expect(state.operator).toBe("");
        expect(state.isOperating).toBeFalsy();
    });

    it("should remove error state when any action is called", () => {
        dispatch({ type: actions.NUMBER, payload: "1" });
        dispatch({ type: actions.OPERATION, payload: "/" });
        dispatch({ type: actions.NUMBER, payload: "0" });
        dispatch({ type: actions.CALCULATE });

        dispatch({ type: actions.NUMBER, payload: "1" });
        expect(state.hasError).toBeFalsy();
        expect(state.currentValue).toBe("1");
    });
});
