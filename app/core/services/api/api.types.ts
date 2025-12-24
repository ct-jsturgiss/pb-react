import type { ApiRequestResult } from "./api.interfaces";

/**
 * String enum for type of API change request being submitted, corresponding to an HTTP method.
 */
export type ApiChangeMethod = "PUT"|"PATCH"|"DELETE";

export type ApiResultHandler = (response:ApiRequestResult) => void;