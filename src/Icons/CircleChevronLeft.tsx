import React from "react";

import { IIcon } from "../types/Icon";

function CircleChevronLeft({
  id,
  style,
  onClick,
  className,
  fill,
  strokeWidth,
}: IIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-circle-chevron-left ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth || 2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      style={style}
      id={id}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill={fill || "none"} />
      <path d="M13 15l-3 -3l3 -3" />
      <path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" />
    </svg>
  );
}

export default CircleChevronLeft;
