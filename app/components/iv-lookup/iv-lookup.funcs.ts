import { create } from "zustand";
import type { IvLookupStore } from "./iv-lookup.types";
import { getOrCall } from "~/core/services/state-store.funcs";
import { type RecordView, type RecordViewState, type RecordWithId } from "~/core/data.types";
import { createRecordWithId } from "~/core/data.funcs";

/**
 * Creates and initializes a state store for inventory lookup.
 */
export const useIvLookupStore = create<IvLookupStore>(setState => ({
    lookups: [],
    lookupsView: [],
    setSearchFilter: (newValue) => setState({searchFilter: getOrCall(newValue)}),
    setLookups: (newValue) => {
        const newStateValue = getOrCall(newValue);
        setState({
            lookups: newStateValue,
            lookupsView: newStateValue
        });
    },
    setLookupsView: (newValue) => {
        const newStateValue = getOrCall(newValue);
        setState({
            lookupsView: newStateValue
        });
    },
}));

//=====> Records

/**
 * Represents an inventory lookup record.
 */
export interface IvLookupRecord extends RecordWithId, RecordView {
    itemCode:string;
    itemName:string;
    pathId:string|null;
    supplierItemCode:string|null;
    manufacturerName:string|null;
    manufacturerDescription:string|null;
    listName:string|null;
}

/**
 * Creates and initializes a default instance of {@link IvLookupRecord}
 * @param id Null or the existing id of the record.
 * @returns 
 */
export const createIvLookupRecord = (id:number|null = null):IvLookupRecord => {
    const rec:IvLookupRecord = {
        ...createRecordWithId(id),
        itemCode: "",
        itemName: "",
        pathId: null,
        supplierItemCode: null,
        manufacturerName: null,
        manufacturerDescription: null,
        listName: null,
        viewState: {
            isSelected: false,
        }
    }

    return rec as IvLookupRecord;
}

//<=====