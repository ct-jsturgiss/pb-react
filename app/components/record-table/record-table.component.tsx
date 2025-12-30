import { Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import type { RecordTableProps } from "./record-table.types";

const defaultPageSize:number = 25;

export function RecordTable(props:RecordTableProps):React.ReactNode {

    // Props
    const { recordKey, columns, recordSource, pageSize, isLoading } = props;
    
    // Local State
    const activePageSize = pageSize ?? defaultPageSize;
    const [page, setPage] = useState<number>(1);
    const [paginatedView, setPaginatedView] = useState<Record<string, unknown>[]>([]);

    // Effects
    useEffect(() => {
        setPaginatedView(getPageSlice(page));
    }, [page, recordSource]);

    // Helpers
    function getPageSlice(page:number) {
        const from = (page - 1) * activePageSize;
        const to = from + activePageSize;
        return recordSource.slice(from, to);
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
                />
            </Paper>
        )

    }


    return buildLayout();
}