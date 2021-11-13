import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {CardType, RootStateType} from "../../../types/types";
import {changeGrade, getCards} from "../../../bll/thunks/thunks";
import c from "./LearnPage.module.scss";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: Array<CardType>) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useSelector((store: RootStateType) => store.cards.response);
    const {
        packId,
        packName
    } = useParams<{ packId: string, packName: string }>();

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        user_id: '',
        __v: 0
    });

    const [grade, setGrade] = useState<number>(0);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCards(packId));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, packId, cards, first]);

    const onNext = () => {
        setIsChecked(false);
        dispatch(changeGrade({card_id: card._id, grade}));

        if (cards.length > 0) {
            setCard(getCard(cards));
        } else {

        }
    }

    return (
        <div className={c.learnPageContainer}>
            <h3>{`Learn '${packName}'`}</h3>

            <div><b>Question:</b> {card.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>check</button>
            </div>

            {isChecked && (
                <>
                    <div><b>Answer:</b> {card.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i}
                                onClick={() => setGrade(i + 1)}>{g}</button>
                    ))}

                    <div>
                        <button onClick={onNext}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};
