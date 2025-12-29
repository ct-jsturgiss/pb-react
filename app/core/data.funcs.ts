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