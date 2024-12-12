import classes from "./Sidebar.module.scss";
import { AppRoute } from "@/app/router";
import { useLocation } from "react-router-dom";
import { NavigationSection } from "@/app/navigation/components/sidebar/components/NavigationSection/NavigationSection";
import { NavigationItem } from "@/app/navigation/components/sidebar/components/NavigationItem/NavigationItem";
import { Logo } from "@/app/navigation/components/sidebar/components/Logo/Logo";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import classNames from "classnames";
import { useState } from "react";
import { IconButton } from "@radix-ui/themes";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

const items = [
    { title: "Przedszkole", items: [{ label: "Aktualności", href: AppRoute.NEWS }] },
    { title: "Kontakt", items: [{ label: "Wiadomości", href: AppRoute.MESSAGES }] },
    {
        title: "Użytkownicy",
        items: [
            { label: "Rodzice", href: AppRoute.PARENTS },
            { label: "Opiekunowie", href: AppRoute.CARETAKERS },
        ],
    },
    { title: "Panel nauczyciela", items: [{ label: "Moja grupa", href: AppRoute.CLASS }] },
];

export function Sidebar() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isCollapsed, setIsCollapsed] = useState(!isDesktop);

    const { pathname } = useLocation();

    const toggleCollapseState = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div className={classNames(classes.container, { [classes.collapsed]: isCollapsed })}>
            {!isDesktop && (
                <div className={classes.collapseButtonWrapper}>
                    <IconButton radius="full" onClick={toggleCollapseState}>
                        <DoubleArrowLeftIcon />
                    </IconButton>
                </div>
            )}

            <div className={classes.header}>
                <Logo />
            </div>

            <nav className={classes.navigation}>
                {items.map((section) => (
                    <NavigationSection key={section.title} title={section.title}>
                        {section.items.map((item) => (
                            <NavigationItem
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                isActive={item.href === pathname}
                            />
                        ))}
                    </NavigationSection>
                ))}
            </nav>

            <div className={classes.footer}>
                <Logo />
            </div>
        </div>
    );
}
