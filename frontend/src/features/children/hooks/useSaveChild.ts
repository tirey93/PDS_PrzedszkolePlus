import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { CHILDREN_QUERY_KEY } from "@/features/children/constants/queryKeys";

type SaveChildOptions = {
    id?: string;
    firstName: string;
    lastName: string;
    groupId: string;
    parentId: string;
    birthDate: string;
};

const saveChild = async (child: SaveChildOptions): Promise<void> => {
    if (child.id) {
        return ChildrenService.updateOne(child, child.id);
    } else {
        return ChildrenService.createOne(child);
    }
};

export const useSaveChild = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveChild,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [CHILDREN_QUERY_KEY] }),
    });
};
