import type { PropsWithChildren } from "react";

export interface SearchBarProps extends PropsWithChildren {
    label?:string;
    placeholder?:string;
    onTextChanged?: (text:string) => void; 
}