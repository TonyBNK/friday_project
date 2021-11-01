import React, {ChangeEvent, useEffect, useState} from "react";
import c from "./Packs.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    GetPacksRequestType,
    GetPacksResponseType,
    RootStateType
} from "../../../types/types";
import {
    addNewPack,
    deletePack,
    getPacks,
    updatePack
} from "../../../bll/thunks/thunks";
import {setRequestParams} from "../../../bll/reducers/packsReducer";
import {NavLink} from "react-router-dom";
import {Spin} from "antd";
import {Paginator} from "../../common/Paginator/Paginator";


export const Packs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacks());
    }, []);

    const {
        cardPacks,
        cardPacksTotalCount,
        pageCount,
        page
    } = useSelector<RootStateType, GetPacksResponseType>(
        state => state.packs.response
    );
    const sortPacks = useSelector<RootStateType, string | undefined>(
        state => state.packs.request.sortPacks
    );
    const myId = useSelector<RootStateType, string | undefined>(
        state => state.profile._id
    );
    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    );
    const params = useSelector<RootStateType, GetPacksRequestType>(
        state => state.packs.request
    );

    const [packName, setPackName] = useState<string>('');

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
    const onChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value);
    }
    const onSearchClick = () => {
        dispatch(setRequestParams({...params, packName: packName}));
        dispatch(getPacks());
    }
    const onChangePageCount = (pageCount: number) => {
        dispatch(setRequestParams({...params, pageCount}))
        dispatch(getPacks());
    }
    const onChangePage = (page: number) => {
        dispatch(setRequestParams({...params, page}))
        dispatch(getPacks());
    }
    const onSortUpByDate = () => {
        dispatch(setRequestParams({...params, sortPacks: '0updated'}));
        dispatch(getPacks());
    }
    const onSortDownByDate = () => {
        dispatch(setRequestParams({...params, sortPacks: '1updated'}));
        dispatch(getPacks());
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
                <input
                    type="text"
                    onChange={onChangeInputSearch}
                    value={params.packName}/>
                <button onClick={onSearchClick}>Search</button>
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
                            <th>
                                Last Updated {
                                sortPacks === '0updated'
                                    ? <button onClick={onSortDownByDate}>▲</button>
                                    : <button onClick={onSortUpByDate}>▼</button>
                            }
                            </th>
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
                                    <td>{new Date(pack.updated).toLocaleDateString()}</td>
                                    <td>{new Date(pack.created).toLocaleDateString()}</td>
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
            <div className={c.footerContainer}>
                <div className={c.paginationContainer}>
                    <Paginator
                        page={page}
                        pageCount={pageCount}
                        itemsTotalCount={cardPacksTotalCount}
                        changePageCount={onChangePageCount}
                        changePage={onChangePage}/>
                </div>
            </div>
        </div>
    )
}
