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

/**
 * Initializes a new search chain object for the specified type.
 * @returns 
 */
export const createSearchChain = <T>() => {
    return {
        lastPattern: "",
        chainLinks: []
    } as SearchChain<T>;
}

/**
 * Attempts to detect an object as an implementation of {@link RecordView} and return it.
 * @param record A record that should implement {@link RecordView}
 * @returns The record as {@link RecordView} or undefined.
 */
export const asRecordView = (record:Record<string,unknown>):RecordView|undefined => {
    if("viewState" in record) {
        return record as unknown as RecordView;
    }

    return undefined;
}

/**
 * Gets a distinct list of objects by the specified property keys.
 * @param records Records to get a distinct array of.
 * @param keys String names of the keys to use as comparison keys.
 * @returns A distinct array of objects.
 */
export const getDistinctBy = <T>(records:T[], keys:[keyof T]|string[]) => {
    const keySet = new Set();
    const distinct:T[] = [];
    for (const record of records) {
        const len = keySet.size;
        const key = keys.map(k => (record as any)[k]).join("~");
        keySet.add(key);
        if(len < keySet.size) {
            distinct.push(record);
        }
    }

    return distinct;
}