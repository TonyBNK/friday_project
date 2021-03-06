import React from "react";


type CardPropsType = {
    user_id: string
    cardsPack_id: string
    myId?: string
    _id: string
    question: string
    answer: string
    updated: string
    grade: number
    onDeleteClick: () => void
    onEditClick: () => void
}
export const Card: React.FC<CardPropsType> = (
    {
        user_id,
        myId,
        _id,
        question,
        answer,
        updated,
        grade,
        onDeleteClick,
        onEditClick
    }
) => {
    return (
        <tr key={_id}>
            <td>{question}</td>
            <td>{answer}</td>
            <td>{updated}</td>
            <td>{grade}</td>
            {
                user_id === myId &&
                <td>
                    <button onClick={onDeleteClick}>
                        Delete
                    </button>
                    <button onClick={onEditClick}>
                        Edit
                    </button>
                </td>
            }
        </tr>
    )
}