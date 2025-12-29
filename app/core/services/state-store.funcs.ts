import type { StoreActionSetFunc, StoreActionSetParam } from "./state-store.types";

/**
 * If the input value is a function, execute with the provided existing state; otherwise treat as raw value.
 * @param actionValue Get function to execute or provided raw value.
 * @param currentValue The current state value to consume when the {@link actionValue} is a function.
 * @returns 
 */
export const getOrCall = <T>(actionValue: StoreActionSetParam<T>, currentValue?:T):T => {
    return (typeof actionValue === "function" ? (actionValue as StoreActionSetFunc<T>)(currentValue!) : actionValue);
}