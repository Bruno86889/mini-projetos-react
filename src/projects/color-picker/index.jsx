/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { hsvToRGB, rgbToHex } from "@/util/colors";
import { MAX_HUE, MAX_SATURATION, MAX_VALUE } from "./constants";
import useSliderValue from "./hooks/use-slider-value";
import "./style.scss";
import ColorPickerColorControls from "./ui/color-controls";
import ColorPickerInfo from "./ui/color-info";

export default function ColorPickerPage() {
    return (
        <div className="container">
            <ColorPicker />
        </div>
    );
}

function ColorPicker() {
    const { value: h, actions: hActions } = useSliderValue({
        max: MAX_HUE,
    });

    const { value: s, actions: sActions } = useSliderValue({
        max: MAX_SATURATION,
    });

    const { value: v, actions: vActions } = useSliderValue({
        max: MAX_VALUE,
    });

    const hex = `#${rgbToHex(hsvToRGB({ h, s, v }))}`;

    const boardValues = { x: s, y: v };

    const boardOnValueUp = {
        x: sActions.stepUp,
        y: vActions.stepUp,
    };

    const boardOnValueDown = {
        x: sActions.stepDown,
        y: vActions.stepDown,
    };

    const boardOnChange = {
        x: sActions.setValueAt,
        y: vActions.setValueAt,
    };

    const boardMaxValues = { x: MAX_SATURATION, y: MAX_VALUE };

    return (
        <div className="color_picker">
            <ColorPickerColorControls
                hue={h}
                hex={hex}
                hueActions={hActions}
                boardMaxValues={boardMaxValues}
                boardOnChange={boardOnChange}
                boardOnValueDown={boardOnValueDown}
                boardOnValueUp={boardOnValueUp}
                boardValues={boardValues}
            />

            <ColorPickerInfo
                hsv={{ h, s, v }}
                hex={hex}
                hueActions={hActions}
                saturationActions={sActions}
                valueActions={vActions}
            />
        </div>
    );
}
