import { PropsWithChildren } from "react";
import { Title } from "@mantine/core";

export const ModalTitle = ({ children }: PropsWithChildren) => {
    return <Title order={3}>{children}</Title>;
};
