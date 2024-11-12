import * as React from "react"
import {IconProps} from "@/app/components/icons/HamburgerIcon";

const LockIcon = ({className, fill, width, height, onClick}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
        viewBox="-0.5 0 25 25"
        onClick={onClick}
    >
        <g
            className={className}
            stroke={fill ?? "currentColor"}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.5 9.32h-9a4.27 4.27 0 0 0-4.5 4v5a4.27 4.27 0 0 0 4.5 4h9a4.27 4.27 0 0 0 4.5-4v-5a4.27 4.27 0 0 0-4.5-4Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 9.32v-2a5 5 0 0 0-10 0v2"
            />
        </g>

    </svg>
)
export default LockIcon
