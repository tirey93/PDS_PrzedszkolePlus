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
    onRenderSubRow?: (data: T) => ReactNode;
    withPagination?: boolean;
    withFilters?: boolean;
    isLoading?: boolean;
};

export function Table<T>({
    data,
    columns,
    onRenderSubRow,
    withPagination,
    withFilters,
    isLoading,
    pageSize = 20,
}: TableProps<T>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand: () => !!onRenderSubRow,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: withFilters ? getFilteredRowModel() : undefined,
        getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
        onPaginationChange: withPagination ? setPagination : undefined,
        state: {
            pagination: withPagination ? pagination : undefined,
        },
    });

    return (
        <Box className={classes.container}>
            <table className={classes.table}>
                <TableHeader table={table} withFilters={withFilters} />
                <TableBody table={table} onRenderSubRow={onRenderSubRow} isLoading={isLoading} />
            </table>
            {withPagination && <TablePagination table={table} />}
        </Box>
    );
}
