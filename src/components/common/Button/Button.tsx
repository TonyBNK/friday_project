import React from 'react'
import './Button.css'
import {Button as ButtonFromAnt} from 'antd';


type ButtonPropsType = {
    htmlType?: "button" | "submit" | "reset"
}

export const Button: React.FC<ButtonPropsType> = (
    {
        htmlType,
        children
    }
) => {

    return (
        <div>
            <ButtonFromAnt
                htmlType={htmlType}
                type={'primary'}
            >
                {children}
            </ButtonFromAnt>
        </div>
    )
}
