import React from 'react';
import {Radio as RadioFromAnt, RadioChangeEvent} from 'antd';


type SuperRadioPropsType = {
    options: string[]
}

export const Radio: React.FC<SuperRadioPropsType> = (
    {
        options
    }
) => {
    const [value, setValue] = React.useState(1);

    const mappedOptions: JSX.Element[] = options
        ? options.map((option, index) => (
            <RadioFromAnt key={index}
                          value={index + 1}>
                {option}
            </RadioFromAnt>
        ))
        : [];

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <RadioFromAnt.Group onChange={onChange}
                            value={value}>
            {mappedOptions}
        </RadioFromAnt.Group>
    )
}
