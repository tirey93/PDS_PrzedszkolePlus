import { PropsWithChildren } from "react";
import { Stack } from "@mantine/core";

export const ModalBody = ({ children }: PropsWithChildren) => {
    return <Stack>{children}</Stack>;
};
