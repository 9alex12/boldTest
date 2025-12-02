export const ErrorBadge = (props: React.SVGProps<SVGSVGElement>) => {
  const stroke = "white";
  const fill = "#FF6B6B";
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="error"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="11" fill={fill} />
      <path
        d="M8 8l8 8M16 8l-8 8"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ErrorBadge;
