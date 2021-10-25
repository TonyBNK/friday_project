import React from 'react'
import './Button.css'
import {Button as ButtonFromAnt} from 'antd';


type ButtonPropsType = {
    onClick: () => void
}

export const Button: React.FC<ButtonPropsType> = (
    {
        onClick
    }
) => {

    return (
        <div>
            <ButtonFromAnt
                type={'primary'}
                onClick={onClick}
            >
                Click me!
            </ButtonFromAnt>
        </div>
    )
}
