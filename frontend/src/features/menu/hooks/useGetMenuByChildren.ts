import { useQuery } from "@tanstack/react-query";
import { MENU_QUERY_KEY } from "@/features/menu/constants/queryKeys";
import { MenuService } from "@/features/menu/api/menuService";
import { Child } from "@/features/children/types/Child";
import { Menu } from "@/features/menu/types/Menu";

type UseGetMenuByChildrenOptions = {
    children?: Child[];
    from: string;
    to: string;
};

const queryFn = async (groupIds: string[], from: string, to: string): Promise<Menu[]> => {
    const queries = groupIds.map((id) => MenuService.getByGroup(id, from, to));
    const results = await Promise.all(queries);
    return results.flat();
};

export const useGetMenuByChildren = ({ children, from, to }: UseGetMenuByChildrenOptions) => {
    const groupsIds = children?.map((child) => child.groupId) ?? [];

    return useQuery({
        queryKey: [MENU_QUERY_KEY, groupsIds, from, to],
        queryFn: () => queryFn([...new Set(groupsIds)], from, to),
    });
};
