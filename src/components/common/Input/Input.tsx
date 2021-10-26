import React, {ChangeEvent, FocusEvent} from 'react';
import {Input as InputFromAnt} from 'antd';
import './Input.css';


type InputTextPropsType = {
    id: string
    type: string
    style?: {
        border: string
        outlined: boolean
    }
    name: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: string
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputTextPropsType> = (
    {
        id,
        type,
        style,
        ...formik
    }
) => {

    return (
        <div>
            <InputFromAnt
                id={id}
                type={type}
                style={style}
                {...formik}
            />
        </div>
    )
}
