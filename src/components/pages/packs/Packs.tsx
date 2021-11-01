import React from "react";
import c from "./Packs.module.scss";
import {useSelector} from "react-redux";
import {CardPackType, RootStateType} from "../../../types/types";


export const Packs = () => {
    const cardPacks = useSelector<RootStateType, Array<CardPackType>>(
        state => state.packs.cardPacks
    );

    return(
        <div className={c.tableContainer}>
            <h2>Packs list</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>Last Updated</th>
                    <th>Created by</th>
                    <th>Actions</th>
                </tr>
                {
                    cardPacks.map(pack => <tr>
                        <td>{pack.name}</td>
                        <td>{pack.cardsCount}</td>
                        <td>{pack.updated}</td>
                        <td>{pack.created}</td>
                        <td>Actions Buttons</td>
                    </tr>)
                }
            </table>
        </div>
    )
}