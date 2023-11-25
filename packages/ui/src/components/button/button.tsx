import * as React from "react";
import { clsx } from "clsx";
import "./button.css";

interface Props {
    variant?: "primary" | "secondary" | "tertiary";
    size?: "small" | "medium" | "large";
    children?: React.ReactNode;
}

export const Button = ({ children, variant = "primary", size = "medium" }: Props) => {
    return (
        <button type="button" className={clsx("btn", `--${variant}`, `--${size}`)}>
            {children}
        </button>
    );
};
