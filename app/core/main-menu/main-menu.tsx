import { Box, Button, Divider, Drawer, Paper, Tooltip, Typography, type CSSProperties } from "@mui/material";
import { MainMenuItemKeys, MainMenuItems } from "../ui.constants";
import * as muiIcons from "@mui/icons-material";
import { useState, type MouseEventHandler } from "react";
import { Link } from "react-router";


//====> Styles

const drawerHeaderImage:CSSProperties = {
    width: "10rem",
    alignSelf: "center",
    marginTop: "1rem"
}

const drawerHeaderText:CSSProperties = {
    textAlign: "center",
    margin: "1rem",
    fontSize: "1.25rem",
    fontWeight: "500"
}

//<====

export default function AppMainMenu() {

    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

    // Render
    function buildItems() {
        return MainMenuItems.map(i => {
            const Icon = muiIcons[i.icon as keyof typeof muiIcons];
            let routeLink:string|null = i.route;
            let clickHandler:MouseEventHandler = () => {};

            switch(i.id) {
                case MainMenuItemKeys.expander.id:
                    clickHandler = () => setDrawerIsOpen(true);
                    break;
            }

            return (
                <Tooltip key={i.id} title={i.label} placement="right">
                    <Button className="pb app-menu-item" onClick={clickHandler}>
                        <Link to={routeLink ?? "#"}>
                            <Icon></Icon>
                        </Link>
                    </Button>
                </Tooltip>
            )
        });
    }

    function buildDrawerItems() {
        return MainMenuItems.map(i => {
            const Icon = muiIcons[i.icon as keyof typeof muiIcons];
            let routeLink:string|null = i.route;
            let clickHandler:MouseEventHandler = () => {};

            switch(i.id) {
                case MainMenuItemKeys.expander.id:
                    return (<></>)
            }

            return (
                <Tooltip key={i.id} title={i.label} placement="right">
                    <Button className="pb app-menu-drawer-item" onClick={clickHandler}>
                        <Link to={routeLink ?? "#"}>
                            <Icon></Icon>
                            <Typography>{i.label}</Typography>
                        </Link>
                    </Button>
                </Tooltip>
            )
        });
    }

    return (
        <Box className="pb app-menu-box">
            {buildItems()}
            <Drawer anchor="left" variant="temporary" 
            open={drawerIsOpen} 
            onClose={() => setDrawerIsOpen(false)}>
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