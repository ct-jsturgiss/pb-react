import { Button, Grid, TextInput, Text, Stack, Group } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function IvLookup() {

    function buildLayout() {
        return (
            <Grid className="pb page-host">
                <Grid.Col span={6}>
                    <Stack className="pb h-100">
                        <Text className="pb page-header">Inventory Lookup</Text>
                        <Grid grow>
                            <Grid.Col span={{base: 10}}>
                                <TextInput label="Search" size="sm"></TextInput>
                            </Grid.Col>
                            <Grid.Col span={1} style={{alignContent: "end", maxWidth: "4.25rem"}}>
                                <Button variant="contained">
                                    <IconX></IconX>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={1} style={{alignContent: "end", maxWidth: "4.25rem"}}>
                                <Button variant="contained">View</Button>
                            </Grid.Col>
                        </Grid>
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