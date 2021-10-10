import React from 'react'
import './Checkbox.css';
import {Checkbox as CheckboxFromAnt} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";


type SuperCheckboxPropsType = {
    onChange?: (checked: boolean) => void
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        onChange
    }
) => {
    const onChangeCallback = (e: CheckboxChangeEvent) => {
        onChange && onChange(e.target.checked);
    }

    return (
        <>
            <CheckboxFromAnt onChange={onChangeCallback}/>
        </>
    )
}
