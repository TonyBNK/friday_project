import React from "react";
import {NavLink} from "react-router-dom";


type PackPropsType = {
    _id: string
    user_id: string
    myId?: string
    name: string
    cardsCount: number
    updated: string
    created: string
    onDeleteClick: () => void
    onEditClick: () => void
}
export const Pack: React.FC<PackPropsType> = (
    {
        user_id,
        _id,
        myId,
        name,
        cardsCount,
        updated,
        created,
        onDeleteClick,
        onEditClick
    }
) => {
    return (
        <tr key={_id}>
            <td>
                <NavLink to={'/cards/' + _id + '/' + name}>
                    {name}
                </NavLink>
            </td>
            <td>{cardsCount}</td>
            <td>{updated}</td>
            <td>{created}</td>
            <td>
                {
                    user_id === myId
                        ? <>
                            <button
                                onClick={onDeleteClick}>
                                Delete
                            </button>
                            <button
                                onClick={onEditClick}>
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
