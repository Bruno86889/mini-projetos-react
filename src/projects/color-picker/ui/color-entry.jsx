import { memo } from "react";

const ColorEntryInput = memo(function ColorEntryInput({
    unit,
    value,
    onUp,
    onDown,
    onChange,
    disabled,
}) {
    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowUp":
                onUp?.();
                break;
            case "ArrowDown":
                onDown?.();
                break;
        }
    };

    const handleChanges = (event) => {
        if (/\D/g.test(event.target.value)) return;
        onChange?.(event.target.value);
    };
    return (
        <label className="color_picker__entry" htmlFor={`color-entry-${unit}`}>
            <input
                onKeyDown={handleKeyDown}
                name={`color-entry-${unit}`}
                id={`color-entry-${unit}`}
                value={value}
                onChange={handleChanges}
                disabled={disabled}
            />
            {unit}
        </label>
    );
});

export default ColorEntryInput;
