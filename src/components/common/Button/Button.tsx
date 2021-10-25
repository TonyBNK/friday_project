import React from 'react'
import './Button.css'
import {Button as ButtonFromAnt} from 'antd';


type ButtonPropsType = {
    onClick: () => void
}

export const Button: React.FC<ButtonPropsType> = (
    {
        onClick,
        children
    }
) => {

    return (
        <div>
            <ButtonFromAnt
                type={'primary'}
                onClick={onClick}
            >
                {children}
            </ButtonFromAnt>
        </div>
    )
}
