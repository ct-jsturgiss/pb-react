import type { StoreActionSetter } from "~/core/services/state-store.types";
import type { IvLookupRecord } from "./iv-lookup.funcs";

//=====> Store

export interface IvLookupStoreState {
    lookups:IvLookupRecord[];
    lookupsView:IvLookupRecord[];
    selectedLookup?:IvLookupRecord;
    searchFilter:string|null;
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
}