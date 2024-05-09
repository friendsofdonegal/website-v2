import clsx from "clsx";
import React from "react";

export interface NavMenuItemProps {
  children?: React.ReactNode;
  className?: string;
  path: string;
}

export const NavMenuItem: React.FC<NavMenuItemProps> = (props) => {
  const { children, className, path } = props;
  return (
    <li>
      <a className={clsx("tracking-tight", "font-bold", "text-white", className)} href={path}>
        {children}
      </a>
    </li>
  );
};
