import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Button } from "@radix-ui/themes";
import { Menu } from "@/features/menu/types/Menu";
import { AddMenuDialog } from "@/features/menu/components/AddMenuDialog/AddMenuDialog";
import { useUser } from "@/features/auth/hooks/useUser";

const columnHelper = createColumnHelper<Menu>();

const columns = [
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => info.getValue(),
        header: () => <span>Data</span>,
    }),
    columnHelper.accessor((row) => row.groupId, {
        id: "groupId",
        cell: (info) => info.getValue(),
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
    isLoading?: boolean;
};

export const MenuTable = ({ menu, isLoading }: MenuTableProps) => {
    const { user } = useUser();
    return (
        <Table
            data={menu}
            isLoading={isLoading}
            columns={[...columns, ...(user?.role === "Admin" ? adminOnlyColumns : [])]}
        />
    );
};
