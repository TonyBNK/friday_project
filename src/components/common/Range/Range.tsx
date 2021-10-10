import React from 'react'
import './Range.css';
import {Slider} from "antd";


type RangePropsType = {
    defaultValue: number
};

export const Range: React.FC<RangePropsType> = (
    {
        defaultValue
    }
) => {
    return (
        <Slider
            defaultValue={defaultValue}
            style={{width: 300}}
        />
    )
}
