import { PropsWithChildren } from "react";
import { Stack } from "@mantine/core";
import classNames from "classnames";

import classes from "./Modal.module.scss";

type ModalWrapperProps = PropsWithChildren<{
    className?: string;
}>;

export const ModalWrapper = ({ children, className }: ModalWrapperProps) => {
    return <Stack className={classNames(classes.wrapper, className)}>{children}</Stack>;
};
