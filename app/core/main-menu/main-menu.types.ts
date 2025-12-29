import type { TablerIcon } from "@tabler/icons-react";
import type { ReactNode } from "react";

export interface AppMenuItem {
    id:string;
    label:string;
    icon:TablerIcon;
    showInDrawer:boolean;
    items?:AppMenuItem[];
    route:string|null;
}