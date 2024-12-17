import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Child } from "@/features/children/types/Child";
import { CaretakerAttendanceCheck } from "@/features/children/components/CaretakerAttendanceCheck/CaretakerAttendanceCheck";

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
    columnHelper.accessor((row) => row.parent, {
        id: "User",
        cell: (info) => `${info.getValue().firstName} ${info.getValue().lastName}`,
        header: () => <span>Rodzic</span>,
    }),
    columnHelper.accessor((row) => row.birthDate, {
        id: "birthDate",
        cell: (info) => info.getValue().toLocaleDateString(),
        header: () => <span>Data urodzenia</span>,
    }),
    columnHelper.display({
        id: "attendance",
        cell: () => <CaretakerAttendanceCheck state="present" onChange={(state) => console.log(state)} />,
        header: () => <span>Obecność</span>,
    }),
];

type GroupChildrenTableProps = {
    childrenList: Child[];
};

export const GroupChildrenTable = ({ childrenList }: GroupChildrenTableProps) => {
    return <Table data={childrenList} columns={columns} withFilters />;
};
