import type { PropsWithChildren } from "react";
import type { SearchEventKind } from "./search-bar.enums";
import type { Action } from "~/core/data.types";

export type SearchEventHandler = (event:SearchEvent) => void;

export interface SearchBarProps extends PropsWithChildren {
    label?:string;
    placeholder?:string;
    value?:string;
    onSearchEvent?: SearchEventHandler;
}

export interface SearchEvent {
    eventType:SearchEventKind;
    oldValue?:string;
    newValue?:string;
}