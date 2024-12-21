import { flexRender, Table } from "@tanstack/react-table";
import classes from "./TableBody.module.scss";
import { ReactNode } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";

type TableBodyProps<T> = {
    table: Table<T>;
    isLoading?: boolean;
    onRenderSubRow?: (data: T) => ReactNode;
};

export function TableBody<T>({ table, onRenderSubRow, isLoading }: TableBodyProps<T>) {
    return (
        <tbody className={classes.body}>
            {isLoading &&
                [...Array(5)].map((_, index) => (
                    <LoadingTableRow columnsCount={table.getAllColumns().length} key={index} />
                ))}

            {!table.getRowModel().rows.length && (
                <tr className={classes.row}>
                    <td className={classes.cell} colSpan={table.getAllColumns().length}>
                        Brak danych
                    </td>
                </tr>
            )}

            {table.getRowModel().rows.map((row) => (
                <>
                    <tr key={row.id} className={classNames(classes.row, { [classes.expanded]: row.getIsExpanded() })}>
                        {row.getVisibleCells().map((cell) => {
                            return (
                                <td
                                    className={classNames(classes.cell, {
                                        [classes.textCell]: typeof cell.getValue() === "string",
                                    })}
                                    key={cell.id}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            );
                        })}
                    </tr>

                    {row.getIsExpanded() && onRenderSubRow && (
                        <tr className={classes.subRow}>
                            <td colSpan={row.getVisibleCells().length} className={classes.cell}>
                                {onRenderSubRow(row.original)}
                            </td>
                        </tr>
                    )}
                </>
            ))}
        </tbody>
    );
}

type LoadingTableRowProps = {
    columnsCount: number;
};

const LoadingTableRow = ({ columnsCount }: LoadingTableRowProps) => {
    return (
        <tr className={classes.row}>
            {[...Array(columnsCount)].map((_, index) => (
                <td key={index} className={classes.cell}>
                    <Skeleton />
                </td>
            ))}
        </tr>
    );
};
