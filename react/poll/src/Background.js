export const Background = () => {
  return (
    <div className="fixed left-0 bottom-0 right-0 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 960 540"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
        }}
      >
        <clipPath id="_clip1">
          <rect x="0" y="1" width="960" height="540" />
        </clipPath>
        <g
          clipPath="url(#_clip1)"
          style={{ fill: "#f5e285", fillRule: "nonzero" }}
        >
          <path d="M0,340l22.8,6.7c22.9,6.6 68.5,20 114.2,22.1c45.7,2.2 91.3,-6.8 137,0c45.7,6.9 91.3,29.5 137.2,32.4c45.8,2.8 91.8,-14.2 137.6,-26c45.9,-11.9 91.5,-18.5 137.2,-9.7c45.7,8.8 91.3,33.2 137,46.5c45.7,13.3 91.3,15.7 114.2,16.8l22.8,1.2l-0,112l-960,0l-0,-202Z" />
        </g>
        <path
          d="M0,391l22.8,9.8c22.9,9.9 68.5,29.5 114.2,42.4c45.7,12.8 91.3,18.8 137,8.8c45.7,-10 91.3,-36 137.2,-38.5c45.8,-2.5 91.8,18.5 137.6,16.7c45.9,-1.9 91.5,-26.5 137.2,-41.5c45.7,-15 91.3,-20.4 137,-20.9c45.7,-0.5 91.3,3.9 114.2,6l22.8,2.2l-0,165l-960,0l-0,-150Z"
          style={{ fill: "#f1d654", fillRule: "nonzero" }}
        />
      </svg>
    </div>
  );
};
