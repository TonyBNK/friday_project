import React from 'react'
import {Slider} from "antd";
import './DoubleRange.css';

type DoubleRangePropsType = {
    defaultValues: [number, number]
};

export const DoubleRange: React.FC<DoubleRangePropsType> = (
    {
        defaultValues
    }
) => {
    return (
        <Slider
            range
            defaultValue={defaultValues}
            style={{width: 300}}
        />
    )
}
