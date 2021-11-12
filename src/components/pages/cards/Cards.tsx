import React, {ChangeEvent, useEffect, useState} from "react";
import c from "./Cards.module.scss";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    GetCardsRequestType,
    GetCardsResponseType, PostCardRequestType, PutCardRequestType,
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
import {Card} from "./card/Card";
import {ModalInput} from "../../common/Modal/input/ModalInput";
import {ModalQuestion} from "../../common/Modal/question/ModalQuestion";


export const Cards = () => {
    const {
        packId,
        packName
    } = useParams<{ packId: string, packName: string }>();

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

    const [searchQuestion, setSearchQuestion] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);

    const [id, setId] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const close = () => {
        setId('');
        setQuestion('');
        setAnswer('');
        setEditMode(false);
        setDeleteMode(false);
    }

    const confirm = (question?: string, answer?: string) => {
        id
            ? dispatch(updateCard({
                card: {
                    cardsPack_id: packId,
                    _id: id,
                    question,
                    answer
                }
            }))
            : dispatch(addNewCard({
                card: {
                    cardsPack_id: packId,
                    question,
                    answer
                }
            }));
    }
    const onAddNewCardClick = () => {
        setEditMode(true);
    }

    const onChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuestion(e.currentTarget.value);
    }
    const onSearchClick = () => {
        dispatch(setRequestParams({...params, cardQuestion: searchQuestion}));
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
            <ModalInput
                show={editMode}
                close={close}
                inputData={[[question, setQuestion], [answer, setAnswer]]}
                enableBackground={true}
                backgroundOnClick={close}
                height={200}
                width={300}
                button={id ? 'Edit' : 'Add'}
                confirm={confirm}
            >
                {id ? 'Edit Card' : 'Add New Card'}
            </ModalInput>
            <ModalQuestion
                show={deleteMode}
                setTrue={() => {
                    dispatch(deleteCard(id, packId));
                    close();
                }}
                setFalse={close}
                width={300}
                height={200}
                enableBackground={true}
                backgroundOnClick={close}
            >
                Are you sure about this?
            </ModalQuestion>
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
                                // const onDeleteClick = () => {
                                //     dispatch(deleteCard(card._id, card.cardsPack_id));
                                // }
                                return <Card
                                    user_id={card.user_id}
                                    cardsPack_id={card.cardsPack_id}
                                    myId={myId}
                                    _id={card._id}
                                    question={card.question}
                                    answer={card.answer}
                                    updated={new Date(card.updated).toLocaleDateString()}
                                    grade={card.grade}
                                    onDeleteClick={() => {
                                        setId(card._id);
                                        setDeleteMode(true);
                                    }}
                                    onEditClick={() => {
                                        setId(card._id);
                                        setQuestion(card.question);
                                        setAnswer(card.answer);
                                        setEditMode(true);
                                    }}
                                />
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
