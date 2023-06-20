import { useEffect } from "react";

export default function useKeyboard({ key, listener, keyType = "keydown" }) {
    useEffect(() => {
        const handleListener = (event) =>
            event.code === key && listener?.(event);

        document.addEventListener(keyType, handleListener);

        return () => document.removeEventListener(keyType, handleListener);
    }, [key, keyType, listener]);
}
