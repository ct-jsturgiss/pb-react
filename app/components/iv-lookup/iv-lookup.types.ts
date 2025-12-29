
// TODO: Create interfaces for records. Updates store.

import type { StoreActionSetter } from "~/core/services/state-store.types";

//=====> Store

export interface IvLookupStoreState {
    lookups:any[];
    lookupsView:any[];
    selectedLookup?:any;
    searchFilter:string|null;
}

export type IvLookupStoreActions = {
    setLookups: StoreActionSetter<IvLookupStoreState["lookups"]>;
    setLookupsView: StoreActionSetter<IvLookupStoreState["lookupsView"]>;
}

export type IvLookupStore = IvLookupStoreState & IvLookupStoreActions;

//<=====