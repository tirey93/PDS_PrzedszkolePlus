import { PropsWithChildren } from "react";
import { Callout } from "@radix-ui/themes";
import { CircleAlert } from "lucide-react";

type AlertProps = PropsWithChildren<{ className?: string }>;

export const Alert = ({ children, className }: AlertProps) => {
    return (
        <Callout.Root color="red" role="alert" className={className} size="1">
            <Callout.Icon>
                <CircleAlert />
            </Callout.Icon>
            <Callout.Text>{children}</Callout.Text>
        </Callout.Root>
    );
};
