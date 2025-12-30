import { Button, Grid, TextInput } from "@mantine/core";
import { IconX, type ReactNode } from "@tabler/icons-react";
import type { SearchBarProps } from "./search-bar.types";
import type { SyntheticEvent } from "react";


export function SearchBar(props:SearchBarProps):React.ReactNode {

    const { children, label, placeholder, onTextChanged } = props;

    function handleInputChanged(event:SyntheticEvent) {
        const input = event.target as HTMLInputElement;
        if(input && onTextChanged) {
            onTextChanged(input.value);
        }
    }

    function buildLayout():React.ReactNode {
        return (
            <div className="pb d-flex flex-row">
                <div className="pb flex-fill">
                    <TextInput label={label} size="sm" placeholder={placeholder} onInput={(e) => handleInputChanged(e)}></TextInput>
                </div>
                <div className="pb align-self-end">
                    {children}
                </div>
            </div>
        )
    }

    return buildLayout();
}