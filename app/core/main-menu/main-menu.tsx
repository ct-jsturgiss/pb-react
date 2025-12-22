import { Box, Button, Paper, Typography } from "@mui/material";

export default function AppMenu() {

    const temp = ["A","B","C"];

    function buildItems() {
        return temp.map(i => (
            <Button key={i} className="pb app-menu-item"><Typography>{i}</Typography></Button>
        ));
    }

    return (
        <Box className="pb app-menu-box">
            {buildItems()}
        </Box>
    );
}