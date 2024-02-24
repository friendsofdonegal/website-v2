import * as React from "react";
import { clsx } from "clsx";
import "./link.css";

interface Props {
    children?: React.ReactNode;
    className?: string;
    href?: string;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "tertiary";
}

export const Link = ({
    children,
    className,
    href = "#",
    size = "medium",
    variant = "primary",
}: Props) => {
    return (
        <a href={href} className={clsx("link", className, `--${variant}`, `--${size}`)}>
            {children}
        </a>
    );
};
