import { Column, Table } from "@tanstack/react-table";
import { Box, TextField } from "@radix-ui/themes";

type FilterProps<TData, TValue> = {
    column: Column<TData, TValue>;
    table: Table<TData>;
};

export function TableFilter<TData, TValue>({ column, table }: FilterProps<TData, TValue>) {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
    const columnFilterValue = column.getFilterValue();

    if (typeof firstValue === "number") {
        return (
            <Box onClick={(e) => e.stopPropagation()}>
                <TextField.Root
                    type="number"
                    value={(columnFilterValue as [number, number])?.[0] ?? ""}
                    onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
                    placeholder="Min"
                />
                <TextField.Root
                    type="number"
                    value={(columnFilterValue as [number, number])?.[1] ?? ""}
                    onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
                    placeholder="Max"
                />
            </Box>
        );
    }

    if (typeof firstValue === "string") {
        return (
            <TextField.Root
                onChange={(e) => column.setFilterValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Szukaj..."
                type="text"
                value={(columnFilterValue ?? "") as string}
            />
        );
    }

    return null;
}
