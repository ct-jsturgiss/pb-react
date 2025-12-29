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
    setLookups: StoreActionSetter<IvLookupStoreState["lookups"]>;
    setLookupsView: StoreActionSetter<IvLookupStoreState["lookupsView"]>;
}

export type IvLookupStore = IvLookupStoreState & IvLookupStoreActions;

//<=====