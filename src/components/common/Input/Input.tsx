import React from 'react';
import {Input as InputFromAnt} from 'antd';
import './Input.css';


type InputTextPropsType = {
    error?: string
    onBlur?: () => void
}

export const Input: React.FC<InputTextPropsType> = (
    {
        error,
        onBlur
    }
) => {

    return (
        <>
            <InputFromAnt placeholder="Type text..."
                          style={{width: 300}}
                          onBlur={onBlur}
                          autoFocus
            />
            {error && <span>{error}</span>}
        </>
    )
}
