import { useEffect, useRef } from "react";

/**
 * Hook that change the document title
 * @param {string} title
 */
export default function useTitle(title) {
    const originalTitleRef = useRef(document.title);

    useEffect(() => {
        const originalTitle = originalTitleRef.current;
        document.title = title;

        return () => {
            document.title = originalTitle;
        };
    }, [title]);
}
