import React from 'react';
import {Select as SelectFromAnt} from 'antd';


const {Option} = SelectFromAnt;

type SuperSelectPropsType = {
    options: string[]
}

export const Select: React.FC<SuperSelectPropsType> = (
    {
        options
    }
) => {
    const mappedOptions: JSX.Element[] = options.map((option, index) =>
        <Option key={index}
                value={option}>
            {option}
        </Option>
    );

    return (
        <SelectFromAnt defaultValue={options[0]}>
            {mappedOptions}
        </SelectFromAnt>
    )
}
