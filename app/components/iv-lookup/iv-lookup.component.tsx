// Mantine UI
import { Button, Grid, TextInput, Text, Stack, Group, Card, Paper } from "@mantine/core";
import { DataTable, type DataTableColumn } from "mantine-datatable";

// Tabler Icons
import { IconX } from "@tabler/icons-react";

// PB
import { useIvLookupStore, type IvLookupRecord } from "./iv-lookup.funcs";


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

export default function IvLookup() {

    // State
    const view:IvLookupRecord[] = useIvLookupStore((state) => state.lookupsView);

    function buildLayout() {

        return (
            <Grid grow className="pb page-host" classNames={{inner: "pb h-100"}}>
                <Grid.Col span={6}>
                    <Stack className="pb h-100">
                        <Text className="pb page-header">Inventory Lookup</Text>
                        <Grid grow>
                            <Grid.Col span={8}>
                                <TextInput label="Search" size="sm"></TextInput>
                            </Grid.Col>
                            <Grid.Col span={"content"} style={{alignContent: "end", maxWidth: "fit-content"}}>
                                <Button variant="contained" style={{maxWidth: "4.5rem"}}>
                                    <IconX></IconX>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={"content"} style={{alignContent: "end", maxWidth: "fit-content"}}>
                                <Button variant="contained">View</Button>
                            </Grid.Col>
                        </Grid>
                        <Paper shadow="md" radius={"md"} withBorder className="pb d-flex flex-fill flex-column">
                            <DataTable
                                className="pb m-2"
                                key={"id"}
                                columns={columns}
                                records={view}
                            />
                        </Paper>
                    </Stack>
                    <Grid>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={6}>

                </Grid.Col>
            </Grid>
        )
    }

    return buildLayout();

}