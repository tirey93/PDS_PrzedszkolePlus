import { BaseChild } from "@/features/children/types/Child";
import { useGetUsersByRole } from "@/features/users/hooks/useGetUsersByRole";
import { useGetAllGroups } from "@/features/groups/hooks/useGetAllGroups";
import { useCallback } from "react";

export const useDecorateChildWithMetadata = () => {
    const { data: parents } = useGetUsersByRole("User");
    const { data: caregivers } = useGetUsersByRole("Admin");
    const { data: groups } = useGetAllGroups();

    return useCallback(
        (child: BaseChild) => {
            const parent = parents?.find((p) => p.id === child.parentId);
            const group = groups?.find((g) => g.id === child.groupId);
            const caregiver = caregivers?.find((c) => c.id === group?.id);

            return { ...child, parent, group, caregiver };
        },
        [caregivers, groups, parents]
    );
};
