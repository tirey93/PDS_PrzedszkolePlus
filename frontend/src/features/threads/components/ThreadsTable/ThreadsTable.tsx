import { createColumnHelper, Row, Table as TableType } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Thread } from "@/features/threads/types/Thread";
import classNames from "classnames";
import classes from "./ThreadsTable.module.scss";
import { IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MessagesList } from "@/features/threads/components/ThreadsTable/components/MessagesList/MessagesList";
import { useMarkThreadAsSeen } from "@/features/threads/hooks/useMarkThreadAsSeen";
import { useCallback, useMemo } from "react";

const columnHelper = createColumnHelper<Thread>();

type ThreadsTableProps = {
    threads: Thread[];
    isLoading?: boolean;
};

export const ThreadsTable = ({ threads, isLoading }: ThreadsTableProps) => {
    const { mutateAsync } = useMarkThreadAsSeen();

    const onExpand = useCallback(
        (row: Row<Thread>, table: TableType<Thread>) => {
            void mutateAsync(row.original.id);
            table.setExpanded({ [row.id]: !row.getIsExpanded() });
        },
        [mutateAsync]
    );

    const expandLatestThread = useCallback(
        (table: TableType<Thread>) => {
            if (!threads.length) {
                return;
            }

            const latestThread = threads.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
            const row = table.getRowModel().rows.find((row) => row.original.id === latestThread.id);

            if (!row || row.getIsExpanded()) {
                return;
            }

            onExpand(row, table);
        },
        [onExpand, threads.length]
    );

    const columns = useMemo(
        () => [
            columnHelper.accessor((row) => row.createdAt, {
                id: "date",
                cell: ({ row, getValue }) => (
                    <span className={classNames({ [classes.notSeen]: !row.original.seen })}>
                        {getValue().toLocaleDateString()}
                    </span>
                ),
                header: () => <span>Data wątku</span>,
            }),
            columnHelper.accessor((row) => row.participant, {
                id: "participant",
                cell: ({ row, getValue }) => {
                    const user = getValue();

                    return (
                        <span className={classNames({ [classes.notSeen]: !row.original.seen })}>
                            {user ? `${user.firstName} ${user.lastName} (${user.login})` : "-"}
                        </span>
                    );
                },
                header: () => <span>Uczestnik wątku</span>,
            }),
            columnHelper.accessor((row) => row.subject, {
                id: "subject",
                cell: ({ row, getValue }) => (
                    <span className={classNames({ [classes.notSeen]: !row.original.seen })}>{getValue()}</span>
                ),
                header: () => <span>Tytuł</span>,
            }),
            columnHelper.display({
                id: "actions",
                cell: ({ row, table }) => (
                    <IconButton onClick={() => onExpand(row, table)} variant="soft" size="1" color="blue">
                        {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
                    </IconButton>
                ),
            }),
        ],
        [onExpand]
    );

    return (
        <Table
            onRender={expandLatestThread}
            data={threads}
            columns={columns}
            onRenderSubRow={MessagesList}
            withFilters
            withPagination
            isLoading={isLoading}
        />
    );
};
