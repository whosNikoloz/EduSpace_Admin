export const IconCheck = ({
  size,
  height,
  width,
  color,
}: {
  size?: number;
  height?: number;
  width?: number;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size || width || 16}
      height={size || height || 16}
      fill={color || "currentColor"}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
};
