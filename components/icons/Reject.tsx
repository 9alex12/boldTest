export const ErrorBadge = ({ size = 32, className = "" }) => {
  const stroke = "white";
  const fill = "#FF6B6B";
  const s = Number(size);
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="error"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
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