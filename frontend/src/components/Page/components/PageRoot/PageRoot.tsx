import { PropsWithChildren } from "react";
import classes from "./PageRoot.module.scss";
import { Box } from "@radix-ui/themes";

type PageRootProps = PropsWithChildren;

export const PageRoot = ({ children }: PageRootProps) => {
    return <Box className={classes.container}>{children}</Box>;
};
