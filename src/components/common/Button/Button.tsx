import React from 'react'
import './Button.css'
import {Button as ButtonFromAnt} from 'antd';


type ButtonPropsType = {
    onClick?: () => void
    htmlType?: "button" | "submit" | "reset"
}

export const Button: React.FC<ButtonPropsType> = (
    {
        onClick,
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
            >
                {children}
            </ButtonFromAnt>
        </div>
    )
}
