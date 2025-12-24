import { ObjConst } from "~/core/utils/api.constants";
import { type ApiRequestResult, type ApiResultError } from "./api.interfaces";
import { RecordChangeKind } from "./api.enums";

/**
 * Provides an interface for a basic query request to the API.
 */
export interface ApiQueryRequest {
    uri:string;
    pageSize?:number;
    offset?:number;
    requestData?:object;
    toJsonBody: () => string;
}

export class ApiQueryRequest implements ApiQueryRequest {

    constructor() {

        this.toJsonBody = function():string {
            const body:any = {
                ...this.requestData
            };
            if(this.offset) {
                body["offset"] = this.offset;
            }
            if(this.pageSize) {
                body["page_size"] = this.pageSize;
            }

            return JSON.stringify(body);
        }
    }

    setUri(uri:string) {
        this.uri = uri;

        return this;
    }

    setPageSize(pageSize?:number) {
        this.pageSize = pageSize;
        
        return this;
    }

    setOffset(offset?:number) {
        this.offset = offset;

        return this;
    }

    setRequestData(data:object) {
        this.requestData = data;

        return this;
    }
}

/**
 * Provides a generic interface for an API request to change record data, using PUT, PATCH, DELETE.
 */
export interface ApiRecordChangeRequest<T> {
    uri:string;
    changeKind:RecordChangeKind;
    records:T[];
    toJsonBody: () => string;
}

export class ApiRecordChangeRequest<T> implements ApiRecordChangeRequest<T> {
    constructor() {
        this.uri = "";
        this.changeKind = RecordChangeKind.None;
        this.records = [];
        this.toJsonBody = function():string {
            const body:any = {
                "records": this.records // TODO: Add constant?
            };
            return JSON.stringify(body);
        }
    }

    setUri(uri:string) {
        this.uri = uri;

        return this;
    }
}

/**
 * Parses and maps API response errors into a proper error interface
 * @param errors Response from API
 * @returns @see ApiResultError
 */
const parseApiErrors = (errors:any[]):ApiResultError[] => {
    return errors.map(e => {
        return {
            errorCode: e[ObjConst.error.errorCode],
            errorMessage: e[ObjConst.error.errorMessage],
            recordKeys: e[ObjConst.error.recordKeys],
        } as ApiResultError;
    });
}

/**
 * Parses an API json response into a proper result interface
 * @param json Response from the API
 * @returns @see ApiRequestResult
 */
export const parseAsResult = (json:any):ApiRequestResult => {

    if(!json || typeof json !== "object") {
        throw new Error("Query result cannot be initialized without a proper JSON response object.");
    }
    const res:ApiRequestResult = {
        isSuccess: json[ObjConst.apiResponse.isSuccess] ?? false,
        isError: json[ObjConst.apiResponse.isError] ?? false,
        isFatal: json[ObjConst.apiResponse.isFatal] ?? false,
        message: json[ObjConst.apiResponse.message] ?? [],
        errors: parseApiErrors(json[ObjConst.apiResponse.errors] ?? []),
        data: json[ObjConst.apiResponse.data] ?? {}
    };

    return res as ApiRequestResult;

}