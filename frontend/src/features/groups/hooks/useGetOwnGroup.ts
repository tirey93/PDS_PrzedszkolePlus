import { useQuery } from "@tanstack/react-query";
import { GROUPS_QUERY_KEY } from "@/features/groups/constants/queryKeys";
import { GroupsService } from "@/features/groups/api/groupsService";

export const useGetOwnGroup = () => {
    return useQuery({
        queryKey: [GROUPS_QUERY_KEY, "Own"],
        queryFn: GroupsService.getOwn,
        select: (data) => (data ? data[0] : null),
    });
};
