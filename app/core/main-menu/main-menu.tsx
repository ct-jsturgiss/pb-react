import { Box, Button, Divider, Drawer, Paper, Tooltip, Typography, type CSSProperties } from "@mui/material";
import { MainMenuItemKeys, MainMenuItems } from "../ui.constants";
import * as muiIcons from "@mui/icons-material";
import { useState, type MouseEventHandler } from "react";


//====> Styles

const drawerPaper:CSSProperties = {
    backgroundColor: "#FFF"
}

const drawerItemText:CSSProperties = {
    marginLeft: "1rem",
    width: "100%",
    textAlign: "left"
}

const drawerHeaderImage:CSSProperties = {
    width: "10rem",
    alignSelf: "center",
    marginTop: "1rem"
}

const drawerHeaderText:CSSProperties = {
    textAlign: "center",
    margin: "1rem",
    fontSize: "1.25rem"
}

//<====

export default function AppMainMenu() {

    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

    // Render
    function buildItems() {
        return MainMenuItems.map(i => {
            const Icon = muiIcons[i.icon as keyof typeof muiIcons];
            let clickHandler:MouseEventHandler = () => {};

            switch(i.id) {
                case MainMenuItemKeys.expander.id:
                    clickHandler = () => setDrawerIsOpen(true);
                    break;
            }

            return (
                <Tooltip title={i.label} placement="right">
                    <Button key={i.id} className="pb app-menu-item" onClick={clickHandler}><Icon></Icon></Button>
                </Tooltip>
            )
        });
    }

    function buildDrawerItems() {
        return MainMenuItems.map(i => {
            const Icon = muiIcons[i.icon as keyof typeof muiIcons];
            let clickHandler:MouseEventHandler = () => {};

            switch(i.id) {
                case MainMenuItemKeys.expander.id:
                    return (<></>)
            }

            return (
                <Button key={i.id} className="pb app-menu-drawer-item" onClick={clickHandler}>
                    <Icon></Icon>
                    <Typography sx={drawerItemText}>{i.label}</Typography>
                </Button>
            )
        });
    }

    return (
        <Box className="pb app-menu-box">
            {buildItems()}
            <Drawer anchor="left" variant="temporary" 
            open={drawerIsOpen} 
            onClose={() => setDrawerIsOpen(false)}
            slotProps={{
                paper: {
                    sx: drawerPaper
                }
            }}>
                <Box component="img" alt="caretaker-stacked-logo" src="/assets/png/caretaker-logo-stacked.png" sx={drawerHeaderImage}/>
                <Typography sx={drawerHeaderText}>PRODUCTION BUILDER</Typography>
                <Divider></Divider>
                <Box className="pb app-menu-drawer">
                    {buildDrawerItems()}
                </Box>
                <Divider></Divider>
            </Drawer>
        </Box>
    );
}