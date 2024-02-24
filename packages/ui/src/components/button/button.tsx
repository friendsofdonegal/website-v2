import * as React from "react";
import { clsx } from "clsx";
import "./button.css";

interface Props {
    className?: string;
    variant?: "primary" | "secondary" | "tertiary";
    size?: "small" | "medium" | "large";
    children?: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({
    children,
    className,
    onClick,
    variant = "primary",
    size = "medium",
}: Props) => {
    return (
        <button
            type="button"
            className={clsx("btn", className, `--${variant}`, `--${size}`)}
            onClick={onClick}>
            {children}
        </button>
    );
};
