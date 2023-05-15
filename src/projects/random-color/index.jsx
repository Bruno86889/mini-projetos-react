import {
    faClipboard,
    faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./style.scss";
import {
    convertHSLToRGB,
    convertRGBToHexadecimal,
    generateRandomHSLColor,
} from "./util";

const BLACK = "#000000";
const WHITE = "#ffffff";

const initialValue = {
    hex: BLACK,
    rgb: "rgb(100%, 100%, 100%)",
    hsl: "hsl(360deg, 100%, 100%)",
    contrast: WHITE,
};

async function copyToTheKeyboard(text) {
    await navigator.clipboard.writeText(text);
}

function generateColors() {
    const { h, s, l } = generateRandomHSLColor();
    const { r, g, b } = convertHSLToRGB({ h, s, l });
    const hex = convertRGBToHexadecimal({ r, g, b });

    let contrast = WHITE;

    if ((h > 40 && h < 200) || l >= 70 || s >= 70) contrast = BLACK;

    return {
        hex,
        contrast,
        rgb: `rgb(${r}%, ${g}%, ${b}%)`,
        hsl: `hsl(${h}deg, ${s}%, ${l}%)`,
    };
}

export default function RandomColor() {
    const [color, setColor] = useState(initialValue);

    const updateColors = () => setColor(generateColors());

    return (
        <div className="random-color" style={{ background: color.hex }}>
            <div className="sample_group">
                <ColorSample
                    label={"hex"}
                    text={color.hex}
                    color={color.contrast}
                    onCopy={copyToTheKeyboard}
                />
                <ColorSample
                    label={"rgb"}
                    text={color.rgb}
                    color={color.contrast}
                    onCopy={copyToTheKeyboard}
                />
                <ColorSample
                    label={"hsl"}
                    text={color.hsl}
                    color={color.contrast}
                    onCopy={copyToTheKeyboard}
                />
            </div>
            <button
                title="Gera uma cor aleatória."
                style={{ borderColor: color.contrast, color: color.contrast }}
                onClick={updateColors}
                className="btn random-color__btn"
            >
                Gerar cor aleatória
            </button>
        </div>
    );
}

function ColorSample({ label, text, color, onCopy }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        onCopy?.(text).then(() => {
            setIsCopied(true);
        });
    };

    useEffect(() => {
        if (!isCopied) return;

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }, [isCopied]);

    return (
        <div className="color_channel" style={{ color, borderColor: color }}>
            <div className="color">
                <span>{label}</span>
                <p>{text}</p>
            </div>

            <button
                title="Copiar"
                className="btn btn--icon-only"
                style={{ color, borderColor: color }}
                onClick={handleCopy}
            >
                <FontAwesomeIcon
                    icon={isCopied ? faClipboardCheck : faClipboard}
                />
            </button>
        </div>
    );
}
