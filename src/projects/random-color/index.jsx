import { hsvToRGB, rgbToHex } from "@/util/colors";
import { useCallback, useEffect, useState } from "react";
import "./style.scss";
import ColorSampleGroup from "./ui/color-sample-group";
import Toolbar from "./ui/toolbar";
import { checkContrast, randomHSVcolor } from "./util";

const NUMBER_OF_SAMPLES = 8;

const generateColors = () => {
    const hsv = randomHSVcolor();
    const rgb = hsvToRGB(hsv);
    const hex = rgbToHex(rgb);

    const contrast = checkContrast(hsv);

    return { color: hex, contrast };
};

const getInitialState = () => {
    let colors = [];

    for (let i = 1; i <= NUMBER_OF_SAMPLES; i++) {
        const { color, contrast } = generateColors();
        const newColor = {
            position: i,
            color,
            contrast,
            isLocked: false,
        };

        colors.push(newColor);
    }

    return colors;
};

export default function RandomColor() {
    const [sampleColors, setSampleColors] = useState(getInitialState);
    const [copyIndex, setCopyIndex] = useState(null);

    const handleUpdateColors = useCallback(() => {
        setSampleColors((oldSamples) => {
            return oldSamples?.reduce((acc, colorData) => {
                if (colorData.isLocked === true) return [...acc, colorData];

                const { color, contrast } = generateColors();
                const newColor = {
                    ...colorData,
                    color,
                    contrast,
                    isLocked: false,
                };
                return [...acc, newColor];
            }, []);
        });
    }, []);

    const handleLock = (position) => {
        setSampleColors((oldSamples) => {
            return oldSamples.reduce((acc, color) => {
                if (color.position !== position) return [...acc, color];

                const newSamples = { ...color, isLocked: !color.isLocked };
                return [...acc, newSamples];
            }, []);
        });
    };

    const handleCopy = async (position, text) => {
        await navigator.clipboard.writeText(text?.toUpperCase());
        setCopyIndex(position);
    };

    // reset the index after copy
    useEffect(() => {
        if (!copyIndex) return;

        const timerId = setTimeout(() => setCopyIndex(null), 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [copyIndex]);

    return (
        <div className="RandomColor">
            <Toolbar onNewColors={handleUpdateColors} />
            <ColorSampleGroup
                activeIndex={copyIndex}
                samples={sampleColors}
                onCopy={handleCopy}
                onLock={handleLock}
            />
        </div>
    );
}
