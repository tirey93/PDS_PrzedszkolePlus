import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { useTheme } from "./hooks/useTheme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme } = useTheme();

    return (
        <MantineProvider forceColorScheme="dark" theme={theme}>
            {children}
        </MantineProvider>
    );
};
