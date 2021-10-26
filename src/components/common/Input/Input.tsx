import React, {ChangeEvent, FocusEvent} from 'react';
import {Input as InputFromAnt} from 'antd';
import './Input.css';


type InputTextPropsType = {
    id: string
    type: string
    name: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputTextPropsType> = (
    {
        id,
        type,
        ...formik
    }
) => {

    return (
        <div>
            <InputFromAnt
                id={id}
                type={type}
                {...formik}
            />
        </div>
    )
}
