import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Button } from "@radix-ui/themes";
import { Menu } from "@/features/menu/types/Menu";
import { AddMenuDialog } from "@/features/menu/components/AddMenuDialog/AddMenuDialog";
import { useUser } from "@/features/auth/hooks/useUser";

type MenuTableProps = {
    menu: Menu[];
};

const columnHelper = createColumnHelper<Menu>();

const columns = [
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => info.getValue().toLocaleDateString(),
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
                trigger={
                    <Button variant="soft" size="1" color="blue">
                        Edytuj
                    </Button>
                }
            />
        ),
    }),
];

export const MenuTable = ({ menu }: MenuTableProps) => {
    const { user } = useUser();
    return <Table data={menu} columns={[...columns, ...(user?.role === "Admin" ? adminOnlyColumns : [])]} />;
};
