import type { DataTableColumn } from "mantine-datatable";
import type { RecordSelectionMode } from "./record-table.enums";
import type { SyntheticEvent } from "react";
import type { RecordView } from "~/core/data.types";

export interface RecordTableProps {
    recordKey:string;
    columns:DataTableColumn[];
    recordSource:RecordView[];
    pageSize?:number;
    isLoading?:boolean;
    selectionMode:RecordSelectionMode;
    onRowClicked?:(args:RowClickArgs) => void;
    onRowDoubleClicked?:(args:RowClickArgs) => void;
    onRecordSelectionChanged?:(args:RecordSelectionArgs) => void;
}

export interface RowClickArgs {
    event:SyntheticEvent;
    index:number;
    record:RecordView;
}

export interface RecordSelectionArgs {
    selection:RecordView[];
}