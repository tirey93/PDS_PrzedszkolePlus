import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Button } from "@radix-ui/themes";
import { Child } from "@/features/children/types/Child";
import { OwnChildrenTableSubRow } from "@/features/children/components/OwnChildrenTable/components/OwnChildrenTableSubRow/OwnChildrenTableSubRow";
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
    columnHelper.accessor((row) => row.group, {
        id: "group",
        cell: (info) => info.getValue(),
        header: () => <span>Grupa</span>,
    }),
    columnHelper.accessor((row) => row.caretaker, {
        id: "caretaker",
        cell: (info) => `${info.getValue().firstName} ${info.getValue().lastName}`,
        header: () => <span>Opiekun</span>,
    }),
    columnHelper.display({
        id: "attendance",
        cell: ({ row }) => <ParentAttendanceCheck state="unspecified" childId={row.original.id} />,
        header: () => <span>Obecność</span>,
    }),
    columnHelper.display({
        id: "menu",
        cell: ({ row }) => (
            <Button variant="soft" size="1" onClick={row.getToggleExpandedHandler()}>
                {row.getIsExpanded() ? "Schowaj menu" : "Pokaż menu"}
            </Button>
        ),
        header: () => <span>Posiłki</span>,
    }),
];

type OwnChildrenTableProps = {
    childrenList: Child[];
};

export const OwnChildrenTable = ({ childrenList }: OwnChildrenTableProps) => {
    return <Table data={childrenList} columns={columns} onRenderSubRow={OwnChildrenTableSubRow} />;
};
