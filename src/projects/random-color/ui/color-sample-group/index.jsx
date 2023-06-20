import ColorSample from "./color-sample";
import "./style.scss";

export default function ColorSampleGroup({
    samples,
    activeIndex,
    onCopy,
    onLock,
}) {
    return (
        <section className="RandomColor__sampleGroup">
            {samples?.map((sample, i) => {
                return (
                    <ColorSample
                        key={i}
                        position={sample.position}
                        color={sample.color}
                        contrast={sample.contrast}
                        isLocked={sample.isLocked}
                        isCopied={activeIndex === sample.position}
                        onLock={onLock}
                        onCopy={onCopy}
                    />
                );
            })}
        </section>
    );
}
