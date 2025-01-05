import { User } from "@/types/User";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CaregiversTableActions } from "@/features/users/components/CaretakersTable/components/CaregiversTableActions/CaregiversTableActions";
import { AccountStatusTag } from "@/features/users/components/AccountStatusTag/AccountStatusTag";

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor((row) => row.firstName, {
        id: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>Imię</span>,
    }),
    columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Nazwisko</span>,
    }),
    columnHelper.accessor((row) => row.login, {
        id: "login",
        cell: (info) => info.getValue(),
        header: () => <span>Login</span>,
    }),
    columnHelper.accessor((row) => row.isActive, {
        id: "isActive",
        cell: (info) => <AccountStatusTag isActive={info.getValue()} />,
        header: () => <span>Status</span>,
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row, table }) => (
            <IconButton
                onClick={() => table.setExpanded({ [row.id]: !row.getIsExpanded() })}
                variant="soft"
                size="1"
                color="blue"
            >
                {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
        ),
    }),
];

type CaregiversTableProps = {
    caregivers: User[];
    isLoading?: boolean;
};

export const CaregiversTable = ({ caregivers, isLoading }: CaregiversTableProps) => {
    return (
        <Table
            sortOptions={[{ id: "lastName", desc: false }]}
            data={caregivers}
            columns={columns}
            onRenderSubRow={CaregiversTableActions}
            withPagination
            withFilters
            isLoading={isLoading}
        />
    );
};
