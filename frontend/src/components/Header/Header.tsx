import classes from "./Header.module.scss";
import { Box, Heading } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren<{ title: string }>;

export const Header = ({ children, title }: HeaderProps) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Heading as="h1" className={classes.pageTitle}>
                    {title}
                </Heading>
                {children}
            </Box>
        </Box>
    );
};
