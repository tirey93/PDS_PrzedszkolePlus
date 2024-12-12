import { QueryClientProvider } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { ThemeProvider } from "@/lib/theme";
import { PropsWithChildren } from "react";

export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={apiClient}>
            <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
    );
};
