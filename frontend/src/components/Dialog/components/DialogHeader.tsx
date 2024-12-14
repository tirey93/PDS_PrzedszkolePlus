import { Box, Dialog, IconButton } from "@radix-ui/themes";
import classes from "./DialogHeader.module.scss";
import { X } from "lucide-react";
import { PropsWithChildren } from "react";

type DialogHeaderProps = PropsWithChildren;

export const DialogHeader = ({ children }: DialogHeaderProps) => {
    return (
        <Box className={classes.header}>
            <Dialog.Title>{children}</Dialog.Title>
            <Dialog.Close>
                <IconButton size="1" variant="soft" color="gray">
                    <X />
                </IconButton>
            </Dialog.Close>
        </Box>
    );
};
