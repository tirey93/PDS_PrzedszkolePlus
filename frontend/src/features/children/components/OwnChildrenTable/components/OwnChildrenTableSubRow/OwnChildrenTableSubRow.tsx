import { Child } from "@/features/children/types/Child";
import { Box } from "@radix-ui/themes";

export const OwnChildrenTableSubRow = (child: Child) => {
    return <Box>{child.firstName}</Box>;
};
