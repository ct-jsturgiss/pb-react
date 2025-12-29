//=====> Types

/**
 * Represents a generic object type with string indexable properties.
 */
export type UnknownJsonRecord = Record<string, any>;

//<=====

//=====> Interfaces

/**
 * Represents an interface for a record with a number identifier.
 */
export interface RecordWithId extends Record<string, unknown> {
    id:number;
}

/**
 * Represents a record adapter with functionality to parse JSON data from the API and translates it into the proper record interface.
 */
export interface FromApiJsonAdapter<T> {
    fromJson(item:UnknownJsonRecord):T;
}

/**
 * Represents a record adapter with functionality to take a record interface and convert it to a DTO.
 */
export interface ToApiDtoAdapter<TInput,TOutput> {
    toDto(item:TInput):TOutput;
}

//<=====