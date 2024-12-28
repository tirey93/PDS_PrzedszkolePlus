import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Thread } from "@/features/threads/types/Thread";
import classNames from "classnames";
import classes from "./ThreadsTable.module.scss";
import { IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MessagesList } from "@/features/threads/components/ThreadsTable/components/MessagesList/MessagesList";

const columnHelper = createColumnHelper<Thread>();

const columns = [
    columnHelper.accessor((row) => row.createdAt, {
        id: "date",
        cell: (info) => (
            <span className={classNames({ [classes.notSeen]: info.row.original.messages.some((m) => !m.seen) })}>
                {info.getValue().toLocaleDateString()}
            </span>
        ),
        header: () => <span>Data wątku</span>,
    }),
    columnHelper.accessor((row) => row.participant, {
        id: "participant",
        cell: (info) => (
            <span className={classNames({ [classes.notSeen]: info.row.original.messages.some((m) => !m.seen) })}>
                {`${info.getValue().firstName} ${info.getValue().lastName} (${info.getValue().login})`}
            </span>
        ),
        header: () => <span>Uczestnik wątku</span>,
    }),
    columnHelper.accessor((row) => row.subject, {
        id: "subject",
        cell: (info) => (
            <span className={classNames({ [classes.notSeen]: info.row.original.messages.some((m) => !m.seen) })}>
                {info.getValue()}
            </span>
        ),
        header: () => <span>Tytuł</span>,
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

type ThreadsTableProps = {
    threads: Thread[];
    isLoading?: boolean;
};

export const ThreadsTable = ({ threads, isLoading }: ThreadsTableProps) => {
    return (
        <Table
            data={threads}
            columns={columns}
            onRenderSubRow={MessagesList}
            withFilters
            withPagination
            isLoading={isLoading}
        />
    );
};
