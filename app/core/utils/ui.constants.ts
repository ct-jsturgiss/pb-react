import type { AppMenuItem } from "../main-menu/main-menu.types";

import { IconMenu2, IconBarcode, IconListDetails, IconSettings } from "@tabler/icons-react";

export const MainMenuItemKeys = {
    expander: {
        id: "expander",
        label: "Open Menu",
        icon: IconMenu2,
        showInDrawer: false,
    } as const as AppMenuItem,
    ivLookup: {
        id: "iv-lookup",
        label: "Inventory Lookup",
        icon: IconBarcode,
        showInDrawer: true,
        route: "iv-lookup"
    } as const as AppMenuItem,
    bomManagement: {
        id: "bom-manage",
        label: "BOM Management",
        icon: IconListDetails,
        showInDrawer: true,
    } as const as AppMenuItem,
    configManagement: {
        id: "config-manage",
        label: "Configuration",
        icon: IconSettings,
        showInDrawer: true,
    } as const as AppMenuItem
}

export const MainMenuItems = [
    MainMenuItemKeys.expander,
    MainMenuItemKeys.ivLookup,
    MainMenuItemKeys.bomManagement,
    MainMenuItemKeys.configManagement
];