import { QueryClient } from "@tanstack/react-query";

export const apiClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
        },
    },
});
