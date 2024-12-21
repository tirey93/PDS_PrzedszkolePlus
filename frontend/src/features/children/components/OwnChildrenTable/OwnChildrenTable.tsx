import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Child } from "@/features/children/types/Child";
import { ParentAttendanceCheck } from "@/features/children/components/ParentAttendanceCheck/ParentAttendanceCheck";

const columnHelper = createColumnHelper<Child>();

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
    columnHelper.accessor((row) => row.groupId, {
        id: "group",
        cell: (info) => info.getValue(),
        header: () => <span>Grupa</span>,
    }),
    columnHelper.accessor((row) => row.caregiver, {
        id: "Admin",
        cell: (info) => (info.getValue() ? `${info.getValue()!.firstName} ${info.getValue()!.lastName}` : "-"),
        header: () => <span>Opiekun</span>,
    }),
    columnHelper.display({
        id: "attendance",
        cell: ({ row }) => <ParentAttendanceCheck state="unspecified" childId={row.original.id} />,
        header: () => <span>Obecność</span>,
    }),
];

type OwnChildrenTableProps = {
    childrenList: Child[];
    isLoading?: boolean;
};

export const OwnChildrenTable = ({ childrenList, isLoading }: OwnChildrenTableProps) => {
    return <Table data={childrenList} columns={columns} isLoading={isLoading} />;
};
