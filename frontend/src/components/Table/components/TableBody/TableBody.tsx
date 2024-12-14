import { flexRender, Table } from "@tanstack/react-table";
import classes from "./TableBody.module.scss";
import { ReactNode } from "react";
import classNames from "classnames";

type TableBodyProps<T> = {
    table: Table<T>;
    onRenderSubRow?: (data: T) => ReactNode;
};

export function TableBody<T>({ table, onRenderSubRow }: TableBodyProps<T>) {
    return (
        <tbody className={classes.body}>
            {table.getRowModel().rows.map((row) => {
                return (
                    <>
                        <tr
                            key={row.id}
                            className={classNames(classes.row, { [classes.expanded]: row.getIsExpanded() })}
                        >
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
                );
            })}
        </tbody>
    );
}
