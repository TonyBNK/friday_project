import React, {useEffect} from "react";
import c from "./Packs.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {CardPackType, RootStateType} from "../../../types/types";
import {getPacks} from "../../../bll/thunks/thunks";


export const Packs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacks());
    }, []);

    const cardPacks = useSelector<RootStateType, Array<CardPackType>>(
        state => state.packs.cardPacks
    );

    return (
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
    )
}