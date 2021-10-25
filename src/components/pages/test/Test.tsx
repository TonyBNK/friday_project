import React from 'react'
import c from './Test.module.scss';
import {Button} from "../../common/Button/Button";
import {Checkbox} from "../../common/Checkbox/Checkbox";
import {Input} from "../../common/Input/Input";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import {Select} from "../../common/Select/Select";
import {Radio} from "../../common/Radio/Radio";
import {Range} from "../../common/Range/Range";
import {DoubleRange} from "../../common/DoubleRange/DoubleRange";


export const Test = () => {
    const names = ['Jack', 'Lucy', 'Bob'];

    return (
        <div className={c.test}>
            <h4>
                Input
            </h4>
            {/*<Input/>*/}
            <h4>
                Button
            </h4>
            {/*<Button>*/}
            {/*    Click me!*/}
            {/*</Button>*/}
            <h4>
                Checkbox
            </h4>
            {/*<Checkbox/>*/}
            <h4>
                Editable Span
            </h4>
            <EditableSpan>
                Some text
            </EditableSpan>
            <h4>
                Select
            </h4>
            <Select options={names}/>
            <h4>
                Radio
            </h4>
            <Radio options={names}/>
            <h4>
                Range
            </h4>
            <Range defaultValue={30}/>
            <h4>
                Double Range
            </h4>
            <DoubleRange defaultValues={[20, 50]}/>
        </div>
    )
}