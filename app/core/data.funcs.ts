import type { RecordView, SearchChain, SearchChainLink } from "./data.types";
import { DbConst } from "./utils/db.constants";

/**
 * Initializes an object with an id property or the default value.
 * @param id Null or existing id to populate.
 * @returns 
 */
export const createRecordWithId = (id:number|null = null) => {
    return {
        id: id ?? DbConst.defaultId
    }
};

export const createSearchChain = <T>() => {
    return {
        lastPattern: "",
        chainLinks: []
    } as SearchChain<T>;
}

export const asRecordView = (record:Record<string,unknown>):RecordView|undefined => {
    if("viewState" in record) {
        return record as unknown as RecordView;
    }

    return undefined;
}