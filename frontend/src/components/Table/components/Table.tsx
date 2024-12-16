import { ReactNode, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { Box } from "@radix-ui/themes";
import { TableBody } from "@/components/Table/components/TableBody/TableBody";
import { TableHeader } from "@/components/Table/components/TableHeader/TableHeader";
import { TablePagination } from "@/components/Table/components/TablePagination/TablePagination";

import classes from "./Table.module.scss";

type TableProps<T> = {
    data: T[];
    columns: ColumnDef<T, any>[];
    pageSize?: number;
    withPagination?: boolean;
    onRenderSubRow?: (data: T) => ReactNode;
};

export function Table<T>({ data, columns, onRenderSubRow, withPagination, pageSize = 20 }: TableProps<T>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand: () => !!onRenderSubRow,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
        onPaginationChange: withPagination ? setPagination : undefined,
        state: {
            pagination: withPagination ? pagination : undefined,
        },
    });

    return (
        <Box>
            <table className={classes.table}>
                <TableHeader table={table} />
                <TableBody table={table} onRenderSubRow={onRenderSubRow} />
            </table>
            {withPagination && <TablePagination table={table} />}
        </Box>
    );
}
