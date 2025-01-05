import { Table } from "@tanstack/react-table";
import { Badge, Box, IconButton, Strong } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import classes from "./TablePagination.module.scss";

type PaginationProps<T> = {
    table: Table<T>;
};

const commonButtonProps = {
    size: "1",
    variant: "solid",
    color: "blue",
} as const;

export function TablePagination<T>({ table }: PaginationProps<T>) {
    return (
        <Box className={classes.container}>
            <Badge color="gray" size="2" variant="surface" highContrast>
                <Strong>
                    Strona {table.getState().pagination.pageIndex + 1} z {Math.max(table.getPageCount(), 1)}
                </Strong>
            </Badge>

            <Box className={classes.buttons}>
                <IconButton {...commonButtonProps} onClick={table.firstPage} disabled={!table.getCanPreviousPage()}>
                    <ChevronsLeft />
                </IconButton>
                <IconButton {...commonButtonProps} onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft />
                </IconButton>
                <IconButton {...commonButtonProps} onClick={table.nextPage} disabled={!table.getCanNextPage()}>
                    <ChevronRight />
                </IconButton>
                <IconButton {...commonButtonProps} onClick={table.lastPage} disabled={!table.getCanNextPage()}>
                    <ChevronsRight />
                </IconButton>
            </Box>
        </Box>
    );
}
