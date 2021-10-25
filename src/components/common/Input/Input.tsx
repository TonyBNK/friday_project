import React, {ChangeEvent} from 'react';
import {Input as InputFromAnt} from 'antd';
import './Input.css';


type InputTextPropsType = {
    type: string
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: string
    onBlur?: () => void
}

export const Input: React.FC<InputTextPropsType> = (
    {
        type,
        name,
        value,
        onChange,
        error,
        onBlur
    }
) => {

    return (
        <div>
            <InputFromAnt
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                style={{width: 300}}
                onBlur={onBlur}
                autoFocus
            />
            {error && <span>{error}</span>}
        </div>
    )
}
