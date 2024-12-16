import classes from "./Sidebar.module.scss";
import { AppRoute } from "@/app/router";
import { useLocation } from "react-router-dom";
import { NavigationSection } from "@/app/navigation/components/sidebar/components/NavigationSection/NavigationSection";
import { NavigationItem } from "@/app/navigation/components/sidebar/components/NavigationItem/NavigationItem";
import { Logo } from "@/app/navigation/components/sidebar/components/Logo/Logo";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import classNames from "classnames";
import { useState } from "react";
import { Box, IconButton } from "@radix-ui/themes";
import { ChevronLeft } from "lucide-react";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard";

const items = [
    { title: "Przedszkole", requiredAccess: "authenticated", items: [{ label: "Aktualności", href: AppRoute.NEWS }] },
    { title: "Kontakt", requiredAccess: "authenticated", items: [{ label: "Wiadomości", href: AppRoute.MESSAGES }] },
    {
        title: "Użytkownicy",
        requiredAccess: "Admin",
        items: [
            { label: "Rodzice", href: AppRoute.PARENTS },
            { label: "Opiekunowie", href: AppRoute.CARETAKERS },
        ],
    },
    { title: "Panel nauczyciela", requiredAccess: "Admin", items: [{ label: "Moja grupa", href: AppRoute.GROUP }] },
    { title: "Panel rodzica", requiredAccess: "User", items: [{ label: "Moje dzieci", href: AppRoute.CHILDREN }] },
    { title: "Personalne", requiredAccess: "authenticated", items: [{ label: "Ustawienia", href: AppRoute.SETTINGS }] },
];

export function Sidebar() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isCollapsed, setIsCollapsed] = useState(!isDesktop);

    const { pathname } = useLocation();

    const toggleCollapseState = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <Box className={classNames(classes.container, { [classes.collapsed]: isCollapsed })}>
            {!isDesktop && (
                <Box className={classes.collapseButtonWrapper}>
                    <IconButton radius="full" onClick={toggleCollapseState}>
                        <ChevronLeft />
                    </IconButton>
                </Box>
            )}

            <Box className={classes.header}>
                <Logo />
            </Box>

            <Box className={classes.navigation}>
                {items.map((section) => (
                    <AccessGuard key={section.title} requiredAccess={section.requiredAccess}>
                        <NavigationSection title={section.title}>
                            {section.items.map((item) => (
                                <NavigationItem
                                    key={item.href}
                                    href={item.href}
                                    label={item.label}
                                    isActive={item.href === pathname}
                                />
                            ))}
                        </NavigationSection>
                    </AccessGuard>
                ))}
            </Box>

            <Box className={classes.footer}>
                <Logo />
            </Box>
        </Box>
    );
}
