import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

export default function ColorSample({
    position,
    color,
    contrast,
    isLocked,
    isCopied,
    onLock,
    onCopy,
}) {
    const handleLock = () => onLock?.(position);
    const handleCopy = () => onCopy?.(position, color);

    const style = { background: color, color: contrast };

    return (
        <article className="ColorSample" style={style}>
            <button
                style={style}
                className="ColorSample__hex"
                onClick={handleCopy}
            >
                {isCopied ? "Copiado" : color}
            </button>

            <button
                style={style}
                className="ColorSample__btn"
                onClick={handleLock}
            >
                <FontAwesomeIcon icon={isLocked ? faLock : faUnlock} />
            </button>
        </article>
    );
}
