import React from 'react'
import './Checkbox.css';
import {Checkbox as CheckboxFromAnt} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";


type SuperCheckboxPropsType = {
    id?: string
    checked?: boolean
    onChange: (e: CheckboxChangeEvent) => void
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        id,
        children,
        ...formik
    }
) => {
    return (
        <div>
            {children} <CheckboxFromAnt
            id={id}
            {...formik}
        />
        </div>
    )
}
