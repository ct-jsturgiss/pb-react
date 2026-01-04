"use client";

// Mantine UI
import { Button, Grid, Text, Stack, Paper } from "@mantine/core";
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
const itemPropWeight:number = 600;
const itemPropFontSize:number = 14;

// Columns
const columns:DataTableColumn[] = [
    {
        accessor: "itemCode",
        title: "Item Code"
    },
    {
        accessor: "itemName",
        title: "Item Name"
    },
    {
        accessor: "supplierItemCode",
        title: "Suppliers Item Code"
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
                <Grid.Col span={12} className="pb grid-column p-0 ps-1">
                    <Text className="pb page-header">Inventory Lookup</Text>
                </Grid.Col>
                <Grid.Col span={6} className="pb grid-column">
                    <Stack className="pb h-100 min-h-100">
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
                    <Paper shadow="md" radius="md" withBorder className="pb p-1 mt-3 pb-3">
                        <Grid>
                            <Grid.Col>
                                <Text fz={18}>{selectedLookup?.itemName ?? "--No Selection--"}</Text>
                            </Grid.Col>
                            <Grid.Col className="pb py-0">
                                <Text span fw={itemPropWeight} fz={itemPropFontSize}>Item Code:</Text>
                                <Text span className="pb mx-1" fz={itemPropFontSize}>{selectedLookup?.itemCode}</Text>
                            </Grid.Col>
                            <Grid.Col className="pb py-0">
                                <Text span fw={itemPropWeight} fz={itemPropFontSize}>Supplier Code:</Text>
                                <Text span className="pb mx-1" fz={itemPropFontSize}>{selectedLookup?.supplierItemCode}</Text>
                            </Grid.Col>
                            <Grid.Col className="pb py-0">
                                <Text span fw={itemPropWeight} fz={itemPropFontSize}>Manufacturer:</Text>
                                <Text span className="pb mx-1" fz={itemPropFontSize}>{selectedLookup?.manufacturerName}</Text>
                            </Grid.Col>
                            <Grid.Col className="pb py-0">
                                <Text span fw={itemPropWeight} fz={itemPropFontSize}>Mfr. Description:</Text>
                                <Text span className="pb mx-1" fz={itemPropFontSize}>{selectedLookup?.manufacturerDescription}</Text>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Grid.Col>
            </Grid>
        )
    }

    return buildLayout();

}