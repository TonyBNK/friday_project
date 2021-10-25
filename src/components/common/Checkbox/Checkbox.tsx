import React from 'react'
import './Checkbox.css';
import {Checkbox as CheckboxFromAnt} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";


type SuperCheckboxPropsType = {
    text: string
    value: boolean
    onChange: (e: CheckboxChangeEvent) => void
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        text,
        value,
        onChange
    }
) => {
    return (
        <div>
            {text} <CheckboxFromAnt
            value={value}
            onChange={onChange}
        />
        </div>
    )
}
