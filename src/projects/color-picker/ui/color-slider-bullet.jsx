export default function ColorSliderBullet({ x, y, color }) {
    return (
        <div
            className="color_picker__bullet"
            style={{
                left: x,
                top: y,
                backgroundColor: color,
                position: "absolute",
            }}
        ></div>
    );
}
