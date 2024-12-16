import { PropsWithChildren } from "react";
import classes from "./PageContent.module.scss";
import { Box } from "@radix-ui/themes";

type PageContentProps = PropsWithChildren;

export const PageContent = ({ children }: PageContentProps) => {
    return <Box className={classes.container}>{children}</Box>;
};
