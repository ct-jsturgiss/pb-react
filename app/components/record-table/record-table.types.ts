import type { DataTableColumn } from "mantine-datatable";
import type { RecordSelectionMode } from "./record-table.enums";
import type { SyntheticEvent } from "react";

export interface RecordTableProps {
    recordKey:string;
    columns:DataTableColumn[];
    recordSource:Record<string, unknown>[];
    pageSize?:number;
    isLoading?:boolean;
    selectionMode:RecordSelectionMode;
    onRowClicked?:(args:RowClickArgs) => void;
    onRowDoubleClicked?:(args:RowClickArgs) => void;
}

export interface RowClickArgs {
    event:SyntheticEvent;
    index:number;
    record:Record<string,unknown>;
}