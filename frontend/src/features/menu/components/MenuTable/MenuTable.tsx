import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Button } from "@radix-ui/themes";
import { Menu, MenuWithGroup } from "@/features/menu/types/Menu";
import { AddMenuDialog } from "@/features/menu/components/AddMenuDialog/AddMenuDialog";
import { useUser } from "@/features/auth/hooks/useUser";
import { Group } from "@/features/groups/types/Group";

const columnHelper = createColumnHelper<MenuWithGroup>();

const columns = [
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => info.getValue(),
        header: () => <span>Data</span>,
    }),
    columnHelper.accessor((row) => row.group, {
        id: "group",
        cell: (info) => info.getValue()?.name ?? "-",
        header: () => <span>Grupa</span>,
    }),
    columnHelper.accessor((row) => row.breakfast, {
        id: "breakfast",
        cell: (info) => info.getValue(),
        header: () => <span>Śniadanie</span>,
    }),
    columnHelper.accessor((row) => row.lunch, {
        id: "lunch",
        cell: (info) => info.getValue(),
        header: () => <span>Lunch</span>,
    }),
    columnHelper.accessor((row) => row.dinner, {
        id: "dinner",
        cell: (info) => info.getValue(),
        header: () => <span>Podwieczorek</span>,
    }),
];

const adminOnlyColumns = [
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
            <AddMenuDialog
                date={row.original.date}
                groupId={row.original.groupId}
                menu={row.original}
                trigger={
                    <Button variant="soft" size="1" color="blue">
                        Edytuj
                    </Button>
                }
            />
        ),
    }),
];

type MenuTableProps = {
    menu: Menu[];
    groups: Group[];
    isLoading?: boolean;
};

export const MenuTable = ({ menu, groups, isLoading }: MenuTableProps) => {
    const { user } = useUser();
    return (
        <Table
            data={combineMenuWithGroups(menu, groups)}
            isLoading={isLoading}
            columns={[...columns, ...(user?.role === "Admin" ? adminOnlyColumns : [])]}
        />
    );
};

export const combineMenuWithGroups = (menu: Menu[], groups: Group[]): MenuWithGroup[] => {
    return menu.map((m) => ({ ...m, group: groups.find((g) => g.id === m.groupId) }));
};
