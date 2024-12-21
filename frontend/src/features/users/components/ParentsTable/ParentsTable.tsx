import { User } from "@/types/User";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ParentsTableActions } from "@/features/users/components/ParentsTable/components/ParentsTableActions/ParentsTableActions";
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
        header: () => <span>Identyfikator</span>,
    }),
    columnHelper.accessor((row) => row.isActive, {
        id: "isActive",
        cell: (info) => <AccountStatusTag isActive={info.getValue()} />,
        header: () => <span>Status</span>,
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
            <IconButton onClick={row.getToggleExpandedHandler()} variant="soft" size="1" color="blue">
                {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
        ),
    }),
];

type ParentsTableProps = {
    parents: User[];
    isLoading?: boolean;
};

export const ParentsTable = ({ parents, isLoading }: ParentsTableProps) => {
    return (
        <Table
            data={parents}
            columns={columns}
            onRenderSubRow={ParentsTableActions}
            withPagination
            withFilters
            isLoading={isLoading}
        />
    );
};
