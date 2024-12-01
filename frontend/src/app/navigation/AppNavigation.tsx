import { PropsWithChildren } from "react";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { SideNavigation } from "./SideNavigation/SideNavigation";

import classes from "./AppNavigation.module.scss";

const PAGE_TOP_OFFSET = 40;

export const AppNavigation = ({ children }: PropsWithChildren) => {
    const [isNavbarVisible, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false);

    return (
        <AppShell
            layout="alt"
            header={{ height: PAGE_TOP_OFFSET }}
            navbar={{ width: 100, breakpoint: "sm", collapsed: { desktop: false, mobile: !isNavbarVisible } }}
        >
            <Burger className={classes.burger} opened={isNavbarVisible} onClick={toggleNavbar} hiddenFrom="sm" />

            <AppShell.Navbar className={classes.appNavigationNavbar} withBorder>
                <SideNavigation onNavigate={closeNavbar} />
            </AppShell.Navbar>

            <AppShell.Main className={classes.outlet}>{children}</AppShell.Main>
        </AppShell>
    );
};
