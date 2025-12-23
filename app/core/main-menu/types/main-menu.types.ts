export interface AppMenuItem {
    id:string;
    label:string;
    icon:string;
    showInDrawer:boolean;
    items?:AppMenuItem[];
}