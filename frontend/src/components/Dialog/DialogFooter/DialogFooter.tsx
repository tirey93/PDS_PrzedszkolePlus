import classes from "./DialogFooter.module.scss";
import { Box } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type DialogFooterProps = PropsWithChildren;

export const DialogFooter = ({ children }: DialogFooterProps) => {
    return <Box className={classes.footer}>{children}</Box>;
};
