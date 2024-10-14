interface Props {
  size?: number;
  fill?: string;
  width?: number;
  height?: number;
}

export const PlusIcon = ({ fill, size, height, width, ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M6 12H18M12 6V18"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};
