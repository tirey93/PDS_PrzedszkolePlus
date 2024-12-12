import { ReactNode, Suspense } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay/LoadingOverlay";

export const WithSuspense = (children: ReactNode) => <Suspense fallback={<LoadingOverlay />}>{children}</Suspense>;
