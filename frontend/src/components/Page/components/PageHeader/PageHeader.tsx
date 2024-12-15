import classes from "./PageHeader.module.scss";
import { Box, Heading } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type PageHeaderProps = PropsWithChildren<{ title: string }>;

export const PageHeader = ({ children, title }: PageHeaderProps) => {
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
