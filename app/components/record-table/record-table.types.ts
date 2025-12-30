import type { DataTableColumn } from "mantine-datatable";

export interface RecordTableProps {
    recordKey:string;
    columns:DataTableColumn[];
    recordSource:Record<string, unknown>[];
    pageSize?:number;
    isLoading?:boolean;
}