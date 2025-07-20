export function globalFilterFn(row: any, columnId: string, filterValue: string) {
    return row
        .getAllCells()
        .some((cell: any) =>
            String(cell.getValue()).toLowerCase().includes(filterValue.toLowerCase())
        );
}
