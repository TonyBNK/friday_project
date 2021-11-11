import React from "react";


type CardPropsType = {
    user_id: string
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
        <td>
            {
                user_id === myId
                    ? <>
                        <button onClick={onDeleteClick}>
                            Delete
                        </button>
                        <button onClick={onEditClick}>
                            Edit
                        </button>
                        <button>
                            Learn
                        </button>
                    </>
                    : <button>
                        Learn
                    </button>
            }
        </td>
    </tr>
  )
}