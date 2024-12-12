import { PropsWithChildren } from "react";

import { Theme } from "@radix-ui/themes";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
            {children}
        </Theme>
    );
};
