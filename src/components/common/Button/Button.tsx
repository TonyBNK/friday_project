import React from 'react'
import './Button.css'
import {Button as ButtonFromAnt} from 'antd';


type ButtonPropsType = {
    htmlType?: "button" | "submit" | "reset"
    isDisabled?: boolean
}

export const Button: React.FC<ButtonPropsType> = (
    {
        htmlType,
        isDisabled,
        children
    }
) => {

    return (
        <div>
            <ButtonFromAnt
                type={'primary'}
                htmlType={htmlType}
                disabled={isDisabled}
            >
                {children}
            </ButtonFromAnt>
        </div>
    )
}
