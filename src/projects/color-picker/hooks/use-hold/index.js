import { useEffect, useState } from "react";

/**
 * Indicate if the user holding an element
 * @param {React.MutableRefObject<HTMLElement>} ref
 * @returns {boolean}
 */
export default function useHold(ref) {
    const [isHolding, setIsHolding] = useState(false);

    const onHold = () => setIsHolding(true);
    const onRelease = () => setIsHolding(false);

    useEffect(() => {
        const element = ref.current;

        element.addEventListener("mousedown", onHold);
        element.addEventListener("touchstart", onHold);

        element.addEventListener("mouseup", onRelease);
        element.addEventListener("mouseleave", onRelease);
        element.addEventListener("touchend", onRelease);

        return () => {
            element.removeEventListener("mousedown", onHold);
            element.removeEventListener("touchstart", onHold);

            element.removeEventListener("mouseup", onRelease);
            element.removeEventListener("mouseleave", onRelease);
            element.removeEventListener("touchend", onRelease);
        };
    }, [ref]);

    return isHolding;
}
