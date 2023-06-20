import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useKeyboard from "../../hooks/use-keyboard";
import "./style.scss";

export default function Toolbar({ onNewColors }) {
    useKeyboard({ key: "Backspace", listener: onNewColors });

    return (
        <div className="RandomColor__toolbar">
            <p>
                Pressione <kbd>Backspace</kbd> para gerar novas cores
            </p>

            <button className="RandomColor__toolbar__btn" onClick={onNewColors}>
                <FontAwesomeIcon icon={faRandom} />
                <span>Gerar novas cores</span>
            </button>
        </div>
    );
}
