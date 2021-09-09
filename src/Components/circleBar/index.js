import React from "react";

const CircleBar = ({ icon, total = 0, count = 0 }) => {

  const a = Math.PI * ((2 * count) / total - 0.5);
  const x = 46 + 46 * Math.cos(a - 0.12202691584261159);
  const y = 46 + 46 * Math.sin(a - 0.12202691584261159);

  let indicator = null;

  if ((Math.PI * 2 * count) / total > Math.PI) {
    indicator = `M46,46 L${50.48828550544305},${0.2194878444809234}  A46,46 1 0,1 ${46},${92} A46,46 1 0,1 ${x},${y}  z`;
  } else {
    indicator = `M46,46 L${50.48828550544305},${0.2194878444809234} A46,46 1 0,1 ${x},${y} z`;
  }

  if (count > total) {
    indicator = `M46,46 L46,0 A46,46 1 0,1 ${46},${0} z`;
    throw new Error("count cannot be greater than total");
  }

  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 93 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M92.9409 46C92.9409 71.4051 72.2853 92 46.8052 92C21.3252 92 0.669556 71.4051 0.669556 46C0.669556 20.5949 21.3252 0 46.8052 0C72.2853 0 92.9409 20.5949 92.9409 46ZM11.1793 46C11.1793 65.6178 27.1296 81.5212 46.8052 81.5212C66.4809 81.5212 82.4312 65.6178 82.4312 46C82.4312 26.3822 66.4809 10.4788 46.8052 10.4788C27.1296 10.4788 11.1793 26.3822 11.1793 46Z"
        fill="#F7F5FF"
      />

      {count > 0 && <path d={indicator} fill="url(#paint0_linear)"></path>}
      <circle cx="46" cy="46" r="36" fill="white"></circle>

      {count > 0 && (
        <circle
          cx={50.99096}
          cy={5.304911}
          r="5"
          fill="url(#paint0_linear)"
        ></circle>
      )}

      {count > 0 && (
        <circle
          cx={46 + 41 * Math.cos(a - 0.12202691584261159)}
          cy={46 + 41 * Math.sin(a - 0.12202691584261159)}
          r="5"
          fill="url(#paint0_linear)"
        ></circle>
      )}

      <image x="6" y="6" width="80" height="80" href={icon} />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="62.8953"
          y1="0.158936"
          x2="62.8953"
          y2="92"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1890FF" />
          <stop offset={1} stopColor="#17C9B2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CircleBar;
