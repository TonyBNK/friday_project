import React, {useEffect, useState} from "react";
import c from "./Packs.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    CardsPackType,
    GetCardsPackRequestType,
    RootStateType
} from "../../../types/types";
import {addNewPack, getPacks} from "../../../bll/thunks/thunks";
import {setRequestParams} from "../../../bll/reducers/packsReducer";


export const Packs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacks());
    }, []);

    const cardPacks = useSelector<RootStateType, Array<CardsPackType>>(
        state => state.packs.response.cardPacks
    );
    const myId = useSelector<RootStateType, string | undefined>(
        state => state.profile._id
    );
    const [params, setParams] = useState<GetCardsPackRequestType>({});

    const onMyClick = () => {
        dispatch(setRequestParams({...params, user_id: myId}));
        dispatch(getPacks());
    }
    const onAllClick = () => {
        dispatch(setRequestParams({...params, user_id: undefined}));
        dispatch(getPacks());
    }
    const onAddNewPackClick = () => {
        dispatch(addNewPack({cardsPack: {}}));
    }

    return (
        <div className={c.packsContainer}>
            <div className={c.buttonContainer}>
                <button onClick={onMyClick}>My</button>
                <button onClick={onAllClick}>All</button>
                <button onClick={onAddNewPackClick}>Add new pack</button>
            </div>
            <div className={c.tableContainer}>
                <h2>Packs list</h2>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Cards</th>
                        <th>Last Updated</th>
                        <th>Created by</th>
                        <th>Actions</th>
                    </tr>
                    {
                        cardPacks.map(pack => <tr key={pack._id}>
                            <td>{pack.name}</td>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.created}</td>
                            <td>Actions Buttons</td>
                        </tr>)
                    }</tbody>
                </table>
            </div>
        </div>
    )
}
