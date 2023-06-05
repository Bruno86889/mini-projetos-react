import { MAX_HUE } from "../constants";
import ColorBoard from "./color-board";
import ColorSlider from "./color-slider";

export default function ColorPickerColorControls({
    hue,
    hex,
    hueActions,
    boardMaxValues,
    boardValues,
    boardOnChange,
    boardOnValueDown,
    boardOnValueUp,
}) {
    return (
        <div className="color_picker__controls">
            <ColorBoard
                hue={hue}
                color={hex}
                max={boardMaxValues}
                value={boardValues}
                onChange={boardOnChange}
                onValueDown={boardOnValueDown}
                onValueUp={boardOnValueUp}
            />

            <ColorSlider
                color={`hsl(${hue}deg,100%,50%)`}
                max={MAX_HUE}
                value={hue}
                onDown={hueActions.stepDown}
                onUp={hueActions.stepUp}
                onChange={hueActions.setValueAt}
            />
        </div>
    );
}
