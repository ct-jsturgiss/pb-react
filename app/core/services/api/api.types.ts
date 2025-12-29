/**
 * String enum for type of API change request being submitted, corresponding to an HTTP method.
 */
export type ApiChangeMethod = "PUT"|"PATCH"|"DELETE";

export type ApiResultHandler = (response:ApiRequestResult) => void;

export interface ApiRequestError {
    msg:string;
    code:number;
}

export interface QueryData<T> {
    response:ApiRequestResult;
    records:T[];
}

export interface ApiQueryRecords {
    offset?:number;
    pageSize?:number;
    count:number;
    records:any[];
}

export interface ApiResultError {
    errorCode:number;
    errorMessage:string;
    recordKeys:any;
}

export interface ApiRequestResult {
    isSuccess:boolean;
    isError:boolean;
    isFatal?:boolean;
    message?:string[];
    errors?:ApiResultError[]; // TODO: Change to errors object interface.
    data?:ApiQueryRecords;
    stateCode?:ApiRequestError
}

export interface ApiQueryBody {
    "page_size"?:number;
    "offset"?:number;
}