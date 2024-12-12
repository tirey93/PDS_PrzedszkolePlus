import { PropsWithChildren } from "react";
import classes from "./NewsList.module.scss";
import { Box } from "@radix-ui/themes";

type NewsListProps = PropsWithChildren;

export const NewsList = ({ children }: NewsListProps) => {
    return <Box className={classes.container}>{children}</Box>;
};
