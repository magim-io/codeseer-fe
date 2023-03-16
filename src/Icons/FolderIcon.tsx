import React from "react";

import { IIcon } from "../types/Icon";

function FolderIcon({
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
      className={`icon icon-tabler icon-tabler-folder ${className}`}
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
      <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
    </svg>
  );
}

export default FolderIcon;
