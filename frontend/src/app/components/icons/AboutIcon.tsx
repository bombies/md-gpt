import * as React from "react"
import {IconProps} from "@/app/components/icons/HamburgerIcon";

const AboutIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 512 512"
    >
        <title>{"about-filled"}</title>
        <path
            className={className}
            fill={fill ?? "currentColor"}
            fillRule="evenodd"
            d="M256 42.667c117.822 0 213.333 95.511 213.333 213.333 0 117.82-95.511 213.333-213.333 213.333-117.82 0-213.333-95.513-213.333-213.333C42.667 138.178 138.18 42.667 256 42.667Zm21.38 192h-42.667v128h42.667v-128ZM256.217 144c-15.554 0-26.837 11.22-26.837 26.37 0 15.764 10.985 26.963 26.837 26.963 15.235 0 26.496-11.199 26.496-26.666 0-15.447-11.261-26.667-26.496-26.667Z"
        />
    </svg>
)
export default AboutIcon
