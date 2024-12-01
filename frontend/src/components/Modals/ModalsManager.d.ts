import { CONTEXT_MODALS } from "./ModalsManager";

declare module "@mantine/modals" {
    export interface MantineModalsOverride {
        modals: typeof CONTEXT_MODALS;
    }
}
