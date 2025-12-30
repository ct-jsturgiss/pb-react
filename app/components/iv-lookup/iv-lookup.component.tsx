"use client";

// Mantine UI
import { Button, Grid, Text, Stack } from "@mantine/core";
import { type DataTableColumn } from "mantine-datatable";

// Tabler Icons
import { IconX } from "@tabler/icons-react";

// PB
import { useIvLookupStore, type IvLookupRecord } from "./iv-lookup.funcs";
import { SearchBar } from "../search-bar/search-bar.component";
import { RecordTable } from "../record-table/record-table.component";
import type { IvLookupProps } from "./iv-lookup.types";

// Constants
const pageSize:number = 25;

// Columns
const columns:DataTableColumn[] = [
    {
        accessor: "id",
        title: "Id"
    },
    {
        accessor: "itemCode",
        title: "Item Code"
    },
    {
        accessor: "itemName",
        title: "Item Name"
    }
];

export default function IvLookup(props:IvLookupProps) {

    // Props
    const { isLoading } = props;

    // State
    const setSearch = useIvLookupStore(state => state.setSearchFilter);
    const view:IvLookupRecord[] = useIvLookupStore(state => state.lookupsView);

    function handleSearchChanged(value?:string) {
        const v = value ?? null;
        setSearch(v);
    }

    function buildLayout() {

        return (
            <Grid grow className="pb page-host" classNames={{inner: "pb h-100 min-h-100"}}>
                <Grid.Col span={6} className="pb grid-column">
                    <Stack className="pb h-100 min-h-100">
                        <Text className="pb page-header">Inventory Lookup</Text>
                        <SearchBar 
                            label="Search" 
                            placeholder="Enter search criteria..." 
                            onTextChanged={(v) => handleSearchChanged(v)}>
                            <Button variant="contained" style={{maxWidth: "4.5rem"}} className="pb mx-1">
                                <IconX></IconX>
                            </Button>
                            <Button variant="contained">View</Button>
                        </SearchBar>
                        <RecordTable
                            recordKey="id"
                            columns={columns}
                            recordSource={view}
                            isLoading={isLoading ?? false}
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={6}>

                </Grid.Col>
            </Grid>
        )
    }

    return buildLayout();

}