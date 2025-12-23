import type { AppMenuItem } from "./main-menu/types/main-menu.types";

export const MainMenuItemKeys = {
    expander: {
        id: "expander",
        label: "Open Menu",
        icon: "Menu",
        showInDrawer: false,
    } as const as AppMenuItem,
    ivLookup: {
        id: "iv-lookup",
        label: "Inventory Lookup",
        icon: "QrCodeScanner",
        showInDrawer: true,
        route: "iv-lookup"
    } as const as AppMenuItem,
    bomManagement: {
        id: "bom-manage",
        label: "BOM Management",
        icon: "ListAlt",
        showInDrawer: true,
    } as const as AppMenuItem,
    configManagement: {
        id: "config-manage",
        label: "Configuration",
        icon: "Settings",
        showInDrawer: true,
    } as const as AppMenuItem
}

export const MainMenuItems = [
    MainMenuItemKeys.expander,
    MainMenuItemKeys.ivLookup,
    MainMenuItemKeys.bomManagement,
    MainMenuItemKeys.configManagement
];