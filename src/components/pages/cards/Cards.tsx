import React, {useEffect} from "react";
import c from "./Cards.module.scss";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../types/types";
import {getCards} from "../../../bll/thunks/thunks";


export const Cards = () => {
    const {packId} = useParams<{ packId: string }>();

    const dispatch = useDispatch();

    const packName = useSelector<RootStateType, string>(
        state => {
            const currPack = state.packs.response.cardPacks.find(pack => {
                return pack._id === packId
            })
            return currPack ? currPack.name : 'Pack 1'
        }
    )

    useEffect(() => {
        dispatch(getCards(packId));
    }, []);

    return (
        <div className={c.cardsContainer}>
            <div className={c.buttonContainer}>
                <button>Add new card</button>
            </div>
            <div className={c.tableContainer}>
                <h2>{packName}</h2>
                <table>
                    <tbody>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Last Updated</th>
                        <th>Grade</th>
                    </tr>
                    {/*{*/}
                    {/*    cardPacks.map(pack => {*/}
                    {/*        const onDeleteClick = () => {*/}
                    {/*            dispatch(deletePack(pack._id));*/}
                    {/*        }*/}
                    {/*        const onEditClick = () => {*/}
                    {/*            dispatch(updatePack({*/}
                    {/*                cardsPack: {*/}
                    {/*                    ...cardPacks,*/}
                    {/*                    _id: pack._id,*/}
                    {/*                    name: 'no named pack'*/}
                    {/*                }*/}
                    {/*            }));*/}
                    {/*        }*/}

                    {/*        return <tr key={pack._id}>*/}
                    {/*            <td>{pack.name}</td>*/}
                    {/*            <td>{pack.cardsCount}</td>*/}
                    {/*            <td>{pack.updated}</td>*/}
                    {/*            <td>{pack.created}</td>*/}
                    {/*            <td>*/}
                    {/*                {*/}
                    {/*                    pack.user_id === myId*/}
                    {/*                        ? <>*/}
                    {/*                            <button onClick={onDeleteClick}>*/}
                    {/*                                Delete*/}
                    {/*                            </button>*/}
                    {/*                            <button onClick={onEditClick}>*/}
                    {/*                                Edit*/}
                    {/*                            </button>*/}
                    {/*                            <button>*/}
                    {/*                                Learn*/}
                    {/*                            </button>*/}
                    {/*                        </>*/}
                    {/*                        : <button>*/}
                    {/*                            Learn*/}
                    {/*                        </button>*/}
                    {/*                }*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*    })*/}
                    {/*}*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}