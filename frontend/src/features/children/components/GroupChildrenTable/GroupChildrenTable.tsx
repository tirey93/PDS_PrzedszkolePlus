import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Child } from "@/features/children/types/Child";
import { CaregiverAttendanceCheck } from "@/features/children/components/CaregiverAttendanceCheck/CaregiverAttendanceCheck";
import { IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GroupChildrenTableActions } from "@/features/children/components/GroupChildrenTable/components/GroupChildrenTableActions/GroupChildrenTableActions";

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
        cell: (info) => (info.getValue() ? `${info.getValue()!.firstName} ${info.getValue()!.lastName}` : "-"),
        header: () => <span>Rodzic</span>,
    }),
    columnHelper.accessor((row) => row.dateOfBirth, {
        id: "birthDate",
        cell: (info) => info.getValue().toLocaleDateString(),
        header: () => <span>Data urodzenia</span>,
    }),
    columnHelper.display({
        id: "attendance",
        cell: () => <CaregiverAttendanceCheck state="present" onChange={(state) => console.log(state)} />,
        header: () => <span>Obecność</span>,
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

type GroupChildrenTableProps = {
    childrenList: Child[];
    isLoading?: boolean;
};

export const GroupChildrenTable = ({ childrenList, isLoading }: GroupChildrenTableProps) => {
    return (
        <Table
            data={childrenList}
            columns={columns}
            onRenderSubRow={GroupChildrenTableActions}
            withFilters
            isLoading={isLoading}
        />
    );
};
