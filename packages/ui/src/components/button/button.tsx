import * as React from "react";
import { clsx } from "clsx";
import "./button.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      onClick,
      variant = "primary",
      size = "medium",
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        className={clsx("btn", `--${variant}`, `--${size}`, className)}
        onClick={onClick}
        type={type}
        ref={ref}>
        {children}
      </button>
    );
    ``;
  },
);
