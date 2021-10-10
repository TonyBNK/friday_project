import React from 'react'
import './Button.css'
import { Button as ButtonFromAnt } from 'antd';


type ButtonPropsType = {}

export const Button: React.FC<ButtonPropsType> = () => {
    return (
        <>
            <ButtonFromAnt type={'primary'}>
                Click me!
            </ButtonFromAnt>
        </>
    )
}
