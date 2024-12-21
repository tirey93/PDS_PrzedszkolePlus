import { useQuery } from "@tanstack/react-query";
import { GROUPS_QUERY_KEY } from "@/features/groups/constants/queryKeys";
import { GroupsService } from "@/features/groups/api/groupsService";

export const useGetAllGroups = () => {
    return useQuery({ queryKey: [GROUPS_QUERY_KEY], queryFn: GroupsService.getAll });
};
