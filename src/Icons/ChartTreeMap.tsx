import React from "react";

import { IIcon } from "../types/Icon";

function ChartTreeMap({
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
      className={`icon icon-tabler icon-tabler-chart-treemap ${className}`}
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
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M12 4v16" />
      <path d="M4 15h8" />
      <path d="M12 12h8" />
      <path d="M16 12v8" />
      <path d="M16 16h4" />
    </svg>
  );
}

export default ChartTreeMap;
