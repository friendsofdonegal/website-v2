import { ReactNode } from "react";
import { Button } from "../button/button";
import { NavMenuItem } from "../nav-menu-item/nav-menu-item";
import React from "react";
import { MenuButton } from "../menu-button/menu-button";
import "./header.css";

interface HeaderProps {
    logo?: ReactNode;
    menuItems?: { label: string; path: string }[];
}

const Header: React.FC<HeaderProps> = (props) => {
    const { logo, menuItems } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <div className="header">
            <div className="header__content">
                <a href="/">{logo}</a>
                <ul className="mr-4 flex-grow justify-end gap-x-8 gap-y-4 md:flex md:flex-row">
                    {menuItems?.map((item, id) => (
                        <NavMenuItem className="hidden md:inline" key={`id-${id}`} path={item.path}>
                            {item.label}
                        </NavMenuItem>
                    ))}
                </ul>
                <Button className="hidden md:inline" variant="tertiary">
                    Donate
                </Button>
                <MenuButton
                    className="md:hidden"
                    isOpen={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen((open) => !open)}
                />
            </div>
            {mobileMenuOpen && (
                <div className="header__mobile-menu">
                    <ul>
                        {menuItems?.map((item, id) => (
                            <NavMenuItem key={`id-${id}`} path={item.path}>
                                {item.label}
                            </NavMenuItem>
                        ))}
                    </ul>
                    <Button variant="tertiary">Donate</Button>
                </div>
            )}
        </div>
    );
};

export { Header };
