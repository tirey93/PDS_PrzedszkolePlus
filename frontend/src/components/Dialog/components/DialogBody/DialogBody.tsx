import classes from "./DialogBody.module.scss";
import { Dialog } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type DialogBodyProps = PropsWithChildren;

export const DialogBody = ({ children }: DialogBodyProps) => {
    return <Dialog.Description className={classes.description}>{children}</Dialog.Description>;
};
