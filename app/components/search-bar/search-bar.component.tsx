import { Button, Grid, TextInput } from "@mantine/core";
import { IconX, type ReactNode } from "@tabler/icons-react";
import type { SearchBarProps, SearchEvent } from "./search-bar.types";
import { useRef, useState, type SyntheticEvent } from "react";
import { SearchEventKind } from "./search-bar.enums";


export function SearchBar(props:SearchBarProps):React.ReactNode {

    const { children, label, placeholder, onSearchEvent, value } = props;

    // Local State
    const lastInput = useRef<string|undefined>(undefined);

    function handleInputChanged(event:SyntheticEvent) {
        const input = event.target as HTMLInputElement;
        const inputEvent = event.nativeEvent as InputEvent;
        if(input && onSearchEvent) {
            const newValue = input.value;
            const newEvent:SearchEvent = {
                eventType: SearchEventKind.None,
                oldValue: lastInput.current,
                newValue: newValue
            };
            if(inputEvent.inputType.startsWith("delete")){
                newEvent.eventType = SearchEventKind.Delete;
            } else {
                newEvent.eventType = SearchEventKind.Add;
            }
            lastInput.current = newValue;
            onSearchEvent(newEvent);
        }
    }

    function buildLayout():React.ReactNode {
        return (
            <div className="pb d-flex flex-row">
                <div className="pb flex-fill">
                    <TextInput value={value ?? ""} label={label} size="sm" placeholder={placeholder} onInput={(e) => handleInputChanged(e)}></TextInput>
                </div>
                <div className="pb align-self-end">
                    {children}
                </div>
            </div>
        )
    }

    return buildLayout();
}