import { ReactNode, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";

import { Loader } from "@/components/Modals/components";

export const withSuspense = (children: ReactNode) => (
    <Suspense
        fallback={
            <LoadingOverlay>
                <Loader />
            </LoadingOverlay>
        }
    >
        {children}
    </Suspense>
);
