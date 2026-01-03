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
import type { SearchEvent } from "../search-bar/search-bar.types";
import { SearchEventKind } from "../search-bar/search-bar.enums";
import { RecordSelectionMode } from "../record-table/record-table.enums";
import type { RecordSelectionArgs } from "../record-table/record-table.types";

// Constants
const pageSize:number = 25;

// Columns
const columns:DataTableColumn[] = [
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
    const { isLoading, onTextSearchEvent } = props;

    // State
    const searchFilter = useIvLookupStore(state => state.searchFilter);
    const setSearch = useIvLookupStore(state => state.setSearchFilter);
    const view = useIvLookupStore(state => state.lookupsView);
    const selectedLookup = useIvLookupStore(state => state.selectedLookup);
    const setSelectedLookup = useIvLookupStore(state => state.setSelectedLookup);

    function clearSearch() {
        if(onTextSearchEvent) {
            onTextSearchEvent({
                eventType: SearchEventKind.Clear,
                oldValue: searchFilter,
                newValue: ""
            } as SearchEvent);
        }
    }

    function handleOnRowSelection(args:RecordSelectionArgs) {
        const first = args.selection[0];
        if(first) {
            setSelectedLookup(first as IvLookupRecord);
        } else {
            setSelectedLookup(undefined);
        }
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
                            onSearchEvent={onTextSearchEvent}
                            value={searchFilter}>
                            <Button variant="contained" style={{maxWidth: "4.5rem"}} className="pb mx-1" onClick={() => clearSearch()}>
                                <IconX></IconX>
                            </Button>
                            <Button variant="contained">View</Button>
                        </SearchBar>
                        <RecordTable
                            recordKey="id"
                            columns={columns}
                            recordSource={view}
                            isLoading={isLoading ?? false}
                            selectionMode={RecordSelectionMode.Single}
                            onRecordSelectionChanged={handleOnRowSelection}
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