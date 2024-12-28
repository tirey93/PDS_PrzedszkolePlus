import { useQuery } from "@tanstack/react-query";
import { MENU_QUERY_KEY } from "@/features/menu/constants/queryKeys";
import { MenuService } from "@/features/menu/api/menuService";

type UseGetMenuByGroupOptions = {
    groupId?: string;
    from: string;
    to: string;
};

export const useGetMenuByGroup = ({ groupId, from, to }: UseGetMenuByGroupOptions) => {
    return useQuery({
        queryKey: [MENU_QUERY_KEY, groupId, from, to],
        queryFn: () => MenuService.getByGroup(groupId ?? "", from, to),
        enabled: !!groupId,
    });
};
