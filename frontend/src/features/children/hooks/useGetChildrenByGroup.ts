import { useQuery } from "@tanstack/react-query";
import { CHILDREN_QUERY_KEY } from "@/features/children/constants/queryKeys";
import { ChildrenService } from "@/features/children/api/childrenService";
import { useDecorateChildWithMetadata } from "@/features/children/hooks/useDecorateChildWithMetadata";

type UseGetChildrenByGroupOptions = {
    groupId?: string;
};

export const useGetChildrenByGroup = ({ groupId }: UseGetChildrenByGroupOptions) => {
    const decorate = useDecorateChildWithMetadata();

    return useQuery({
        queryKey: [CHILDREN_QUERY_KEY],
        enabled: !!groupId,
        queryFn: () => ChildrenService.getByGroup(groupId ?? ""),
        select: (children) => children.map(decorate),
    });
};
