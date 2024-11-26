import { Stack } from "@mantine/core";

import classes from "./SideNavigation.module.scss";

type SideNavigationProps = {
    onNavigate?: () => unknown;
};

export const SideNavigation = ({  }: SideNavigationProps) => {
    return (
        <Stack component="nav" className={classes.sideNavigationContainer}>

        </Stack>
    );
};
