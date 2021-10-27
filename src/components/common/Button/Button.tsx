import React from 'react'
import './Button.css'
import {Button as ButtonFromAnt} from 'antd';


type ButtonPropsType = {
    disabled?: boolean
    onClick?: () => void
    style?: {
        position: string
        right: number
    }
    htmlType?: "button" | "submit" | "reset"
}

export const Button: React.FC<ButtonPropsType> = (
    {
        onClick,
        disabled,
        htmlType,
        children
    }
) => {

    return (
        <div>
            <ButtonFromAnt
                htmlType={htmlType}
                type={'primary'}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </ButtonFromAnt>
        </div>
    )
}
