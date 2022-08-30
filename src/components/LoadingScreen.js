// LoadingScreen component is an animated SVG converted at https://react-svgr.com/playground/
const LoadingScreen = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
            margin: "auto",
            background: "transparent",
            display: "block",
            shapeRendering: "auto",
        }}
        width={200}
        height={200}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        {...props}
    >
        <path fill="#e15b64" d="M15 30h10v40H15z">
            <animate
                attributeName="opacity"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                values="1;0.2;1"
                begin={-0.6}
            />
        </path>
        <path fill="#f47e60" d="M35 30h10v40H35z">
            <animate
                attributeName="opacity"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                values="1;0.2;1"
                begin={-0.4}
            />
        </path>
        <path fill="#f8b26a" d="M55 30h10v40H55z">
            <animate
                attributeName="opacity"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                values="1;0.2;1"
                begin={-0.2}
            />
        </path>
        <path fill="#abbd81" d="M75 30h10v40H75z">
            <animate
                attributeName="opacity"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                values="1;0.2;1"
                begin={-1}
            />
        </path>
    </svg>
)

export default LoadingScreen