import React, {useState} from 'react'
import {Input} from '../Input/Input';
import './EditableSpan.css';


type EditableSpanType = {
    error?: string
}

export const EditableSpan: React.FC<EditableSpanType> = (
    {
        children
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const onBlurCallback = () => {
        setEditMode(false)
    }
    const onDoubleClickHandler = () => {
        setEditMode(true);
    }

    return (
        <div>
            {editMode
                ? <Input
                    onBlur={onBlurCallback}
                />
                : <span onDoubleClick={onDoubleClickHandler}>
                        {children}
                    </span>
            }
        </div>
    )
}
