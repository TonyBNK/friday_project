import React from 'react'
import './Checkbox.css';
import {Checkbox as CheckboxFromAnt} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";


type SuperCheckboxPropsType = {
    value: boolean
    onChange: (e: CheckboxChangeEvent) => void
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        children,
        value,
        onChange
    }
) => {
    return (
        <div>
            {children} <CheckboxFromAnt
            value={value}
            onChange={onChange}
        />
        </div>
    )
}
