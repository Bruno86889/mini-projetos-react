import { useLayoutEffect, useState } from "react";

/**
 * Get the element bounding rect and update it every time of the window is resized
 * @param {React.MutableRefObject<HTMLElement>} ref
 * @returns {{x: number,y: number,height: number,width: number,bottom: number,left: number,right: number} }
 */
export default function useBounds(ref) {
    const [bounds, setBounds] = useState({
        x: null,
        y: null,
        height: null,
        width: null,
        bottom: null,
        left: null,
        right: null,
    });

    useLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;

        const handleRect = () => setBounds(element.getBoundingClientRect());

        handleRect();
        window.addEventListener("resize", handleRect);
        element.addEventListener("resize", handleRect);

        return () => {
            window.addEventListener("resize", handleRect);
            element.addEventListener("resize", handleRect);
        };
    }, [ref]);

    return bounds;
}
