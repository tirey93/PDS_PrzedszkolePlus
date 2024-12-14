import { Tooltip } from "@radix-ui/themes";
import { CircleX, Info } from "lucide-react";
import { ReactNode } from "react";

type TooltipState = "info" | "error";

type RequirementsTooltipProps = {
    error?: string;
    content: ReactNode;
};

export const RequirementsTooltip = ({ error, content }: RequirementsTooltipProps) => {
    const state = inferStateFromProps({ error, content });
    const Icon = mapStateToIcon(state);

    return (
        <Tooltip content={content}>
            <Icon color={mapStateToColor(state)} size={14} />
        </Tooltip>
    );
};

const inferStateFromProps = (props: RequirementsTooltipProps): TooltipState => {
    if (props.error) {
        return "error";
    }

    return "info";
};

const mapStateToColor = (state: TooltipState) => {
    switch (state) {
        case "error":
            return "crimson";

        case "info":
            return "purple";
    }
};

const mapStateToIcon = (state: TooltipState) => {
    switch (state) {
        case "error":
            return CircleX;

        case "info":
            return Info;
    }
};
