import { MainMenuItemKeys, MainMenuItems } from "../utils/ui.constants";
import { useState, type MouseEventHandler } from "react";
import { Link } from "react-router";

// mantine
import { Box, Button, Divider, Drawer, Text, Tooltip, type CSSProperties } from "@mantine/core";

//====> Styles

const drawerHeaderImageBox:CSSProperties = {
    textAlign: "center"
}

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
            let routeLink:string|null = i.route;
            let clickHandler:MouseEventHandler = () => {};

            switch(i.id) {
                case MainMenuItemKeys.expander.id:
                    clickHandler = () => setDrawerIsOpen(true);
                    break;
            }

            return (
                <Tooltip key={i.id} label={i.label} position="right-end">
                    <Button className="pb app-menu-item" onClick={clickHandler} variant="outline">
                        <Link to={routeLink ?? "#"}>
                            <i.icon></i.icon>
                        </Link>
                    </Button>
                </Tooltip>
            )
        });
    }

    function buildDrawerItems() {
        return MainMenuItems.map(i => {
            let routeLink:string|null = i.route;
            let clickHandler:MouseEventHandler = () => {};

            switch(i.id) {
                case MainMenuItemKeys.expander.id:
                    return (<></>)
            }

            return (
                <Tooltip key={i.id} label={i.label} position="right-end">
                    <Button className="pb app-menu-drawer-item" onClick={clickHandler} variant="subtle">
                        <Link to={routeLink ?? "#"}>
                            <i.icon size={36}></i.icon>
                            <Text>{i.label}</Text>
                        </Link>
                    </Button>
                </Tooltip>
            )
        });
    }

    return (
        <Box className="pb app-menu-box">
            {buildItems()}
            <Drawer position="left" variant="temporary" size={"xs"}
            opened={drawerIsOpen} 
            onClose={() => setDrawerIsOpen(false)}>
                <Box style={drawerHeaderImageBox}>
                    <Box component="img" alt="caretaker-stacked-logo" src="/assets/png/caretaker-logo-stacked.png" style={drawerHeaderImage}/>
                </Box>
                <Text style={drawerHeaderText}>PRODUCTION BUILDER</Text>
                <Divider></Divider>
                <Box className="pb app-menu-drawer">
                    {buildDrawerItems()}
                </Box>
                <Divider></Divider>
            </Drawer>
        </Box>
    );
}