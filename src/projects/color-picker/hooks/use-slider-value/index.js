import { useCallback, useDebugValue, useState } from "react";
import { clamp } from "../../util";

/**
 * Return an value in a defined range
 * @param {{max: number, min: number, initialValue: number, step: number, onChange: (value)=> void}} params
 * @returns {{value: number, actions: {setValueAt: (val:number)=> void, stepUp: ()=> void, stepDown: ()=> void}}}
 */
export default function useSliderValue({
    max,
    min = 0,
    initialValue,
    step = 1,
    onChange,
}) {
    const [value, setValue] = useState(initialValue || min);
    useDebugValue(value);

    const setValueAt = useCallback(
        (newValue) => {
            const clampedValue = clamp(newValue, min, max);
            setValue(clampedValue);
            onChange?.(clampedValue);
        },
        [max, min, onChange]
    );

    const stepUp = useCallback(
        () => setValueAt(value + step),
        [setValueAt, step, value]
    );
    const stepDown = useCallback(
        () => setValueAt(value - step),
        [setValueAt, step, value]
    );

    const actions = { setValueAt, stepUp, stepDown };

    return { value, actions };
}
