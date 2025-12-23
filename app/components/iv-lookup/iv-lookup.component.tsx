import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as muiIcons from "@mui/icons-material"

export default function IvLookup() {

    function buildLayout() {
        return (
            <Grid container spacing={0} columns={2} className="pb page-host" direction="row">
                <Grid size={1} columns={2} direction="column">
                    <Grid columns={1} direction="column">
                        <Typography fontSize={"1.5rem"}>Inventory Lookup</Typography>
                        <Grid className="pb d-flex flex-fill">
                            <TextField className="pb flex-fill" label="Search" size="small" variant="filled"></TextField>
                            <Button variant="contained">
                                <muiIcons.Close></muiIcons.Close>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid>

                    </Grid>
                </Grid>
                <Grid size={1}>

                </Grid>
            </Grid>
        )
    }

    return buildLayout();

}