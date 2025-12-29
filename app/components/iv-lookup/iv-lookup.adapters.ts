import type { FromApiJsonAdapter, ToApiDtoAdapter, UnknownJsonRecord } from "~/core/data.types";
import { createIvLookupRecord, type IvLookupRecord } from "./iv-lookup.funcs";

export const IvLookupKeys = {
    id: "id",
    itemCode: "item_code",
    itemName: "item_name",
    pathId: "path_id",
    supplierItemCode: "suppliers_item_code",
    manufacturerName: "manufacturer_name",
    manufacturerDesc: "manufacturer_description",
    listName: "list_name"
}

export type IvLookupApiAdapter = 
    FromApiJsonAdapter<IvLookupRecord> &
    ToApiDtoAdapter<IvLookupRecord, any>;

export const IvLookupAdapter:IvLookupApiAdapter = {
    fromJson(item) {
        const id:number|null = item[IvLookupKeys.id] ?? null;
        const rec:IvLookupRecord = createIvLookupRecord(id);
        rec.itemCode = item[IvLookupKeys.itemCode];
        rec.itemName = item[IvLookupKeys.itemName];
        rec.pathId = item[IvLookupKeys.pathId];
        rec.supplierItemCode = item[IvLookupKeys.supplierItemCode];
        rec.manufacturerName = item[IvLookupKeys.manufacturerName];
        rec.manufacturerDescription = item[IvLookupKeys.manufacturerDesc];
        rec.listName = (item[IvLookupKeys.listName] as string)?.trim() === "" ? null : item[IvLookupKeys.listName];

        return rec;
    },
    toDto(item) {
        throw new Error("Not implemented.");
    },
};