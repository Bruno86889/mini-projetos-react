import ColorEntryInput from "./color-entry";

export default function ColorPickerInfo({
    hex,
    hsv,
    hueActions,
    saturationActions,
    valueActions,
}) {
    return (
        <div className="color_picker__info">
            <ColorEntryInput unit="Hex" value={hex?.toUpperCase()} disabled />
            <div className="channels">
                <ColorEntryInput
                    unit="h"
                    value={hsv?.h}
                    onDown={hueActions?.stepDown}
                    onUp={hueActions?.stepUp}
                    onChange={hueActions?.setValueAt}
                />
                <ColorEntryInput
                    unit="s"
                    value={hsv?.s}
                    onDown={saturationActions?.stepDown}
                    onUp={saturationActions?.stepUp}
                    onChange={saturationActions?.setValueAt}
                />
                <ColorEntryInput
                    unit="v"
                    value={hsv?.v}
                    onDown={valueActions?.stepDown}
                    onUp={valueActions?.stepUp}
                    onChange={valueActions?.setValueAt}
                />
            </div>
        </div>
    );
}
