 import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";

import "dayjs/locale/pl.js";
import "dayjs/locale/en.js";

import { ModalsManager } from "@/components/Modals";
import { apiClient } from "@/lib/apiClient";
import { ThemeProvider } from "@/lib/theme";

export const AppProvider = () => {
    const modals = useMemo(() => ({}), []);

    return (
        <QueryClientProvider client={apiClient}>
            <ThemeProvider>
                <ModalsManager modals={modals}>
                    <Notifications />
                    <Outlet />
                </ModalsManager>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
