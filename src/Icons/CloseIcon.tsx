import React from "react";

import { IIcon } from "../types/Icon";

function CloseIcon({
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
      className={`icon icon-tabler icon-tabler-x ${className}`}
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
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export default CloseIcon;
