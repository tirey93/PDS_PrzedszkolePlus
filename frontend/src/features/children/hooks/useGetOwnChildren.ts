import { useQuery } from "@tanstack/react-query";
import { CHILDREN_QUERY_KEY } from "@/features/children/constants/queryKeys";
import { ChildrenService } from "@/features/children/api/childrenService";
import { useDecorateChildWithMetadata } from "@/features/children/hooks/useDecorateChildWithMetadata";

export const useGetOwnChildren = () => {
    const decorate = useDecorateChildWithMetadata();

    return useQuery({
        queryKey: [CHILDREN_QUERY_KEY],
        queryFn: ChildrenService.getOwn,
        select: (children) => children.map(decorate),
    });
};
