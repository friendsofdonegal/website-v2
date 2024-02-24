import React, { ReactElement } from "react";
import { NavMenuItemProps } from "../nav-menu-item/nav-menu-item";
import { Button } from "../button/button";
import { MenuButton } from "../menu-button/menu-button";

export interface NavMenuProps {
    isMobileMenuOpen?: boolean;
    onCloseMobileMenu?: () => void;
    children?: ReactElement<NavMenuItemProps> | ReactElement<NavMenuItemProps>[];
}

export const NavMenu: React.FC<NavMenuProps> = (props) => {
    const { children, isMobileMenuOpen = false, onCloseMobileMenu } = props;
    return (
        <div className="absolute top-[40px] mb-[230px] md:mb-0">
            <div className="relative flex flex-grow justify-end md:hidden">
                <MenuButton isOpen={isMobileMenuOpen} onClick={() => onCloseMobileMenu?.()} />
            </div>
            <div className="absolute md:relative md:mt-0 md:flex md:flex-grow md:items-center">
                <ul className="mr-4 flex-grow flex-col justify-end gap-4 md:flex md:flex-row">
                    {children}
                </ul>
                <Button variant="tertiary">Donate</Button>
            </div>
        </div>
    );
};
