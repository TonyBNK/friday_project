import React, {ChangeEvent, useEffect, useState} from "react";
import c from "./Cards.module.scss";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    GetCardsRequestType,
    GetCardsResponseType,
    RootStateType
} from "../../../types/types";
import {
    addNewCard,
    deleteCard,
    getCards,
    updateCard
} from "../../../bll/thunks/thunks";
import {Spin} from "antd";
import {Paginator} from "../../common/Paginator/Paginator";
import {setRequestParams} from "../../../bll/reducers/cardsReducer";


export const Cards = () => {
    const {packId, packName} = useParams<{ packId: string, packName: string }>();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards(packId));
    }, []);


    const {
        cards,
        cardsTotalCount,
        pageCount,
        page
    } = useSelector<RootStateType, GetCardsResponseType>(
        state => state.cards.response
    );
    const sortCards = useSelector<RootStateType, string | undefined>(
        state => state.cards.request.sortCards
    );
    const myId = useSelector<RootStateType, string | undefined>(
        state => state.profile._id
    );
    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    );
    const params = useSelector<RootStateType, GetCardsRequestType>(
        state => state.cards.request
    );

    const [cardQuestion, setCardQuestion] = useState<string>('');

    const onAddNewCardClick = () => {
        dispatch(addNewCard({card: {cardsPack_id: packId}}));
    }
    const onChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setCardQuestion(e.currentTarget.value);
    }
    const onSearchClick = () => {
        dispatch(setRequestParams({...params, cardQuestion: cardQuestion}));
        dispatch(getCards(packId))
    }
    const onChangePageCount = (pageCount: number) => {
        dispatch(setRequestParams({...params, pageCount}));
        dispatch(getCards(packId));
    }
    const onChangePage = (page: number) => {
        dispatch(setRequestParams({...params, page}))
        dispatch(getCards(packId));
    }
    const onSortUpByGrade = () => {
        dispatch(setRequestParams({...params, sortCards: '0grade'}));
        dispatch(getCards(packId));
    }
    const onSortDownByGrade = () => {
        dispatch(setRequestParams({...params, sortCards: '1grade'}));
        dispatch(getCards(packId));
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
            <div className={c.titleContainer}>
                <h2>{packName}</h2>
                <input
                    type="text"
                    onChange={onChangeInputSearch}
                    value={params.cardQuestion}/>
                <button onClick={onSearchClick}>Search</button>
            </div>
            <div className={c.bodyContainer}>
                <div className={c.buttonContainer}>
                    <button onClick={onAddNewCardClick}>Add new card</button>
                </div>
                <div className={c.tableContainer}>
                    <table>
                        <tbody>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Last Updated</th>
                            <th>
                                Grade {
                                sortCards === '0grade'
                                    ? <button
                                        onClick={onSortDownByGrade}>▲</button>
                                    :
                                    <button onClick={onSortUpByGrade}>▼</button>
                            }
                            </th>
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
                                    <td>{new Date(card.updated).toLocaleDateString()}</td>
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
            <div className={c.footerContainer}>
                <div className={c.paginationContainer}>
                    <Paginator
                        page={page}
                        pageCount={pageCount}
                        itemsTotalCount={cardsTotalCount}
                        changePageCount={onChangePageCount}
                        changePage={onChangePage}/>
                </div>
            </div>
        </div>
    )
}