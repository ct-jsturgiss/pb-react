import { Paper, type DefaultMantineColor } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import type { RecordTableProps, RowClickArgs } from "./record-table.types";
import { asRecordView, getDistinctBy } from "~/core/data.funcs";
import { RecordSelectionMode } from "./record-table.enums";
import type { RecordView } from "~/core/data.types";

const defaultPageSize:number = 25;
const selectedRowClass = "pb record-table-row-selected";

export function RecordTable(props:RecordTableProps):React.ReactNode {

    // Props
    const { 
        recordKey, columns, recordSource, pageSize, isLoading,
        selectionMode, onRowClicked, onRowDoubleClicked, onRecordSelectionChanged
    } = props;
    
    // Local State
    const activePageSize = pageSize ?? defaultPageSize;
    const [page, setPage] = useState<number>(1);
    const [paginatedView, setPaginatedView] = useState<RecordView[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<RecordView[]>([]);

    // Effects
    useEffect(() => {
        setPaginatedView(getPageSlice(page));
    }, [page, recordSource]);

    // Helpers
    function getPageSlice(page:number):RecordView[] {
        const from = (page - 1) * activePageSize;
        const to = from + activePageSize;
        return recordSource.slice(from, to);
    }

    function getRowClassStyle(record:Record<string, unknown>, rowIndex:number):string|undefined {
        const rec = asRecordView(record);
        if(rec && rec.viewState.isSelected) {
            return selectedRowClass;
        }
        return undefined
    }

    function handleRowSelectionChanged(selected:RecordView[]) {
        // This is by ref but probably okay for now.
        const netSelected = selectedRecords.filter(r => !selected.includes(r));
        // Get all selected that implement the view interface.
        if(selectionMode == RecordSelectionMode.Single) {
            // Clear entire selection
            for (const rec of netSelected) {
                rec.viewState = {
                    ...rec.viewState,
                    isSelected: false
                }
            }
        }
        for (const record of selected) {
            if(record) {
                record.viewState = {
                    ...record.viewState,
                    isSelected: !record.viewState.isSelected
                }
            }
        }
        setSelectedRecords([...netSelected, ...selected]);
        onRecordSelectionChanged?.({
            selection: selectedRecords
        });
    }

    function handleRowClick(row:RowClickArgs) {
        const rowView = asRecordView(row.record);
        if(rowView) {
            handleRowSelectionChanged([rowView]);
        }
        onRowClicked?.(row);
    }

    function buildLayout():React.ReactNode {

        return (
            <Paper shadow="md" radius={"md"} withBorder className="pb d-flex flex-fill flex-column min-h-0">
                <DataTable
                    className="pb m-2"
                    key={recordKey}
                    columns={columns}
                    records={paginatedView}
                    page={page}
                    recordsPerPage={activePageSize}
                    totalRecords={recordSource.length}
                    onPageChange={(p) => setPage(p)}
                    fetching={isLoading ?? false}
                    highlightOnHover
                    rowClassName={getRowClassStyle}
                    onRowClick={handleRowClick}
                    onRowDoubleClick={onRowDoubleClicked}
                />
            </Paper>
        )

    }


    return buildLayout();
}