import type { StoreActionSetter } from "~/core/services/state-store.types";
import type { IvLookupRecord } from "./iv-lookup.funcs";
import type { SearchEvent } from "../search-bar/search-bar.types";

//=====> Store

export interface IvLookupStoreState {
    lookups:IvLookupRecord[];
    lookupsView:IvLookupRecord[];
    selectedLookup?:IvLookupRecord;
    searchFilter?:string;
}

export type IvLookupStoreActions = {
    setSearchFilter: StoreActionSetter<IvLookupStoreState["searchFilter"]>;
    setLookups: StoreActionSetter<IvLookupStoreState["lookups"]>;
    setLookupsView: StoreActionSetter<IvLookupStoreState["lookupsView"]>;
}

export type IvLookupStore = IvLookupStoreState & IvLookupStoreActions;

//<=====

export interface IvLookupProps {
    isLoading?:boolean;
    onTextSearchEvent?:(event:SearchEvent) => void;
}