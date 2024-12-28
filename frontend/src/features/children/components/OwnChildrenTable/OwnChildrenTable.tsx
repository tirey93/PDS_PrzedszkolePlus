import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Child, ChildWithAttendance } from "@/features/children/types/Child";
import { ParentAttendanceCheck } from "@/features/children/components/ParentAttendanceCheck/ParentAttendanceCheck";
import { Attendance } from "@/features/children/types/Attendance";
import { combineChildrenWithAttendance } from "@/features/children/utils/combineChildrenWithAttendance";

const columnHelper = createColumnHelper<ChildWithAttendance>();

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
        cell: ({ row }) => (
            <ParentAttendanceCheck state={row.original.attendance?.state ?? "unspecified"} childId={row.original.id} />
        ),
        header: () => <span>Obecność</span>,
    }),
];

type OwnChildrenTableProps = {
    childrenList: Child[];
    attendance: Attendance[];
    date: string;
    isLoading?: boolean;
};

export const OwnChildrenTable = ({ childrenList, isLoading, attendance, date }: OwnChildrenTableProps) => {
    return (
        <Table
            data={combineChildrenWithAttendance(childrenList, attendance, date)}
            columns={columns}
            isLoading={isLoading}
        />
    );
};
