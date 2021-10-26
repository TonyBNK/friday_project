import React from 'react'
import './Button.css'
import {Button as ButtonFromAnt} from 'antd';


type ButtonPropsType = {
    onClick: () => void
    isDisabled?: boolean
}

export const Button: React.FC<ButtonPropsType> = (
    {
        isDisabled,
        onClick,
        children
    }
) => {

    return (
        <div>
            <ButtonFromAnt
                type={'primary'}
                onClick={onClick}
                disabled={isDisabled}
            >
                {children}
            </ButtonFromAnt>
        </div>
    )
}
