import React from 'react'
import './Checkbox.css';
import {Checkbox as CheckboxFromAnt} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";


type SuperCheckboxPropsType = {
    checked: boolean
    onChange: (e: CheckboxChangeEvent) => void
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        children,
        checked,
        onChange
    }
) => {
    return (
        <div>
            {children} <CheckboxFromAnt
            checked={checked}
            onChange={onChange}
        />
        </div>
    )
}
