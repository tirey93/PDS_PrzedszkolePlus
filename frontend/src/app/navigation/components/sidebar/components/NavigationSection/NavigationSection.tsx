import { PropsWithChildren } from "react";
import { Box, Text } from "@radix-ui/themes";
import classes from "./NavigationSection.module.scss";

type NavigationSectionProps = PropsWithChildren<{
    title: string;
}>;

export const NavigationSection = ({ title, children }: NavigationSectionProps) => {
    return (
        <Box className={classes.section}>
            <Text className={classes.title}>{title}</Text>
            <Box className={classes.items}>{children}</Box>
        </Box>
    );
};
