import React from "react";

const SuccessBadge = (props: React.SVGProps<SVGSVGElement>) => {
  const stroke = "white";
  const fill = "#7CE6B9";
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="success"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="11" fill={fill} />
      <path
        d="M7.5 12.2l2.2 2.2L16.5 8.6"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SuccessBadge;