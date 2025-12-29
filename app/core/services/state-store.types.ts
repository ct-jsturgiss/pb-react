/**
 * Represents a type for a generic handler function that consumes the current value and outputs a new one of the provided type.
 */
export type StoreActionSetFunc<T> = (currentValue:T) => T;

/**
 * Represents the input type for a generic store action.
 */
export type StoreActionSetParam<T> = T | StoreActionSetFunc<T>;

/**
 * Represents a generic store action type for 'zustand'.
 */
export type StoreActionSetter<T> = (newValue: StoreActionSetParam<T>) => void;