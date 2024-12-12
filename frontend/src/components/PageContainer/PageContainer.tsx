import { PropsWithChildren } from "react";
import classes from "./PageContainer.module.scss";
import { Box } from "@radix-ui/themes";

type PageContainerProps = PropsWithChildren;

export const PageContainer = ({ children }: PageContainerProps) => {
    return <Box className={classes.container}>{children}</Box>;
};
