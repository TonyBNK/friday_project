import React, {useEffect} from "react";
import c from "./Cards.module.scss";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CardType, RootStateType} from "../../../types/types";
import {
    addNewCard,
    addNewPack,
    deleteCard,
    getCards, updateCard, updatePack
} from "../../../bll/thunks/thunks";
import {Spin} from "antd";


export const Cards = () => {
    const {packId} = useParams<{ packId: string }>();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards(packId));
    }, []);

    const packName = useSelector<RootStateType, string>(
        state => {
            const currPack = state.packs.response.cardPacks.find(pack => {
                return pack._id === packId
            })
            return currPack ? currPack.name : 'Pack 1'
        }
    );
    const cards = useSelector<RootStateType, Array<CardType>>(
        state => state.cards.response.cards
    );
    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    );
    const myId = useSelector<RootStateType, string | undefined>(
        state => state.profile._id
    );

    const onAddNewCardClick = () => {
        dispatch(addNewCard({card: {cardsPack_id: packId}}));
    }

    if (isLoading) {
        return <div style={{
            position: 'fixed',
            width: '100%',
            top: '30%',
            textAlign: 'center'
        }}>
            <Spin size={"large"}/>
        </div>
    }

    return (
        <div className={c.cardsContainer}>
            <div className={c.buttonContainer}>
                <button onClick={onAddNewCardClick}>Add new card</button>
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
                        <th>Actions</th>
                    </tr>
                    {
                        cards.map(card => {
                            const onDeleteClick = () => {
                                dispatch(deleteCard(card._id, card.cardsPack_id));
                            }
                            const onEditClick = () => {
                                dispatch(updateCard({
                                    card: {
                                        ...cards,
                                        cardsPack_id: card.cardsPack_id,
                                        _id: card._id,
                                        question: 'How are you?'
                                    }
                                }));
                            }

                            return <tr key={card._id}>
                                <td>{card.question}</td>
                                <td>{card.answer}</td>
                                <td>{card.updated}</td>
                                <td>{card.grade}</td>
                                <td>
                                    {
                                        card.user_id === myId
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
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}