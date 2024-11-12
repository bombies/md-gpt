import * as React from "react"
import {MouseEventHandler} from "react";

export interface IconProps {
    className?: string,
    fill?: string,
    width?: number,
    height?: number,
    onClick?: MouseEventHandler<SVGElement>
}

const HamburgerIcon = ({className, fill, width, height, onClick}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 24 24"
        onClick={onClick}
    >
        <path
            className={className}
            fill={fill ?? "currentColor"}
            fillRule="evenodd"
            d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75ZM20.75 12a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75ZM20.75 17a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z"
            clipRule="evenodd"
        />
    </svg>
)
export default HamburgerIcon
