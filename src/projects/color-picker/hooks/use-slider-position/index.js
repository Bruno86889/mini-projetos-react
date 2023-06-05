import { useCallback, useMemo } from "react";
import { calculateOffset, percent } from "../../util";

/**
 * Calculate the current position of an slider bullet based of a value
 * @param {{valueMax: number, value: number, onChange: (actualPosition: number)=> void, elementBounds: {width: number, height: number, x: number, y: number}, isVertical: boolean, isReverse: boolean}} params
 * @returns {{position: number, onPositionChange: (event: MouseEvent)=> void}}
 */
export default function useSliderPosition({
    valueMax,
    value = 0,
    elementBounds,
    isVertical = false,
    isReverse = false,
    onChange,
}) {
    const convertionConstants = useMemo(() => {
        const { width, height } = elementBounds;
        const elementSize = isVertical ? height : width;

        return {
            valueToPosition: elementSize / valueMax,
            positionToValue: valueMax / elementSize,
        };
    }, [elementBounds, isVertical, valueMax]);

    const position = useMemo(() => {
        const { width, height } = elementBounds;
        const { valueToPosition } = convertionConstants;
        const elementSize = isVertical ? height : width;

        if (isReverse) {
            return percent((valueMax - value) * valueToPosition, elementSize);
        }

        return percent(value * valueToPosition, width);
    }, [
        convertionConstants,
        elementBounds,
        isVertical,
        isReverse,
        value,
        valueMax,
    ]);

    const onPositionChange = useCallback(
        (event) => {
            const obj = "touches" in event ? event.touches[0] : event;
            const { clientX, clientY } = obj;
            const { width, height, x, y } = elementBounds;

            const eventPosition = isVertical ? clientY : clientX;
            const elementSize = isVertical ? height : width;
            const elementPosition = isVertical ? y : x;

            const { positionToValue } = convertionConstants;

            const offset =
                calculateOffset(
                    eventPosition,
                    elementPosition,
                    0,
                    elementSize
                ) * positionToValue;

            const positionOffset = isReverse ? valueMax - offset : offset;
            onChange?.(Math.floor(positionOffset));
        },
        [
            elementBounds,
            isVertical,
            convertionConstants,
            isReverse,
            valueMax,
            onChange,
        ]
    );

    return { position, onPositionChange };
}
