import { PropsWithChildren } from "react";
import { ModalsProvider } from "@mantine/modals";

type ModalsManagerProps = PropsWithChildren<{
    modals: {};
}>;

export const ModalsManager = ({ children, modals }: ModalsManagerProps) => {
    return <ModalsProvider modals={modals}>{children}</ModalsProvider>;
};
