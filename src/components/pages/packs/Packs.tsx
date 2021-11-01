import React, {useEffect, useState} from "react";
import c from "./Packs.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    PackType,
    GetPacksRequestType,
    RootStateType
} from "../../../types/types";
import {
    addNewPack,
    deletePack,
    getPacks,
    updatePack
} from "../../../bll/thunks/thunks";
import {setRequestParams} from "../../../bll/reducers/packsReducer";
import { NavLink } from "react-router-dom";
import {PATH} from "../Routes";
import {Spin} from "antd";


export const Packs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacks());
    }, []);

    const cardPacks = useSelector<RootStateType, Array<PackType>>(
        state => state.packs.response.cardPacks
    );
    const myId = useSelector<RootStateType, string | undefined>(
        state => state.profile._id
    );
    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    );
    const [params, setParams] = useState<GetPacksRequestType>({});

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
            <div className={c.packsContainer}>
                <div className={c.titleContainer}>
                    <h2>Packs list</h2>
                    <input type="text"/><button>+</button>
                </div>
                <div className={c.bodyContainer}>
                    <div className={c.buttonContainer}>
                        <button onClick={onMyClick}>My</button>
                        <button onClick={onAllClick}>All</button>
                        <button onClick={onAddNewPackClick}>Add new pack
                        </button>
                    </div>
                    <div className={c.tableContainer}>
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
                                cardPacks.map(pack => {
                                    const onDeleteClick = () => {
                                        dispatch(deletePack(pack._id));
                                    }
                                    const onEditClick = () => {
                                        dispatch(updatePack({
                                            cardsPack: {
                                                ...cardPacks,
                                                _id: pack._id,
                                                name: 'no named pack'
                                            }
                                        }));
                                    }

                                    return <tr key={pack._id}>
                                        <td>
                                            <NavLink to={'/cards/' + pack._id}>
                                                {pack.name}
                                            </NavLink>
                                        </td>
                                        <td>{pack.cardsCount}</td>
                                        <td>{pack.updated}</td>
                                        <td>{pack.created}</td>
                                        <td>
                                            {
                                                pack.user_id === myId
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
                                })
                            }</tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}
