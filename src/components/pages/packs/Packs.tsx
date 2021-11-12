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
import {Spin} from "antd";
import {Paginator} from "../../common/Paginator/Paginator";
import {Pack} from "./pack/Pack";
import {ModalInput} from "../../common/Modal/input/ModalInput";
import {ModalQuestion} from "../../common/Modal/question/ModalQuestion";


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

    const [searchPack, setSearchPack] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);

    const [packId, setPackId] = useState<string>('');
    const [packName, setPackName] = useState<string>('');

    const close = () => {
        setPackId('');
        setPackName('');
        setEditMode(false);
        setDeleteMode(false);
    }

    const confirm = (packName: string) => {
        packId
            ? dispatch(updatePack({
                cardsPack: {
                    _id: packId,
                    name: packName
                }
            }))
            : dispatch(addNewPack({
                cardsPack: {
                    name: packName
                }
            }));
    }

    const onMyClick = () => {
        dispatch(setRequestParams({...params, user_id: myId}));
        dispatch(getPacks());
    }
    const onAllClick = () => {
        dispatch(setRequestParams({...params, user_id: undefined}));
        dispatch(getPacks());
    }
    const onAddNewPackClick = () => {
        setEditMode(true);
    }
    const onChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchPack(e.currentTarget.value);
    }
    const onSearchClick = () => {
        dispatch(setRequestParams({...params, packName: searchPack}));
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
            <ModalInput
                show={editMode}
                close={close}
                inputData={[[packName, setPackName]]}
                enableBackground={true}
                backgroundOnClick={close}
                height={200}
                width={300}
                button={packId ? 'Edit' : 'Add'}
                confirm={{pack: confirm}}
            >
                {packId ? 'Edit Pack' : 'Add New Pack'}
            </ModalInput>
            <ModalQuestion
                show={deleteMode}
                setTrue={() => {
                    dispatch(deletePack(packId));
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
                                    ? <button
                                        onClick={onSortDownByDate}>▲</button>
                                    :
                                    <button onClick={onSortUpByDate}>▼</button>
                            }
                            </th>
                            <th>Created by</th>
                            <th>Actions</th>
                        </tr>
                        {
                            cardPacks.map(pack => <Pack
                                    _id={pack._id}
                                    user_id={pack.user_id}
                                    myId={myId}
                                    name={pack.name}
                                    cardsCount={pack.cardsCount}
                                    updated={new Date(pack.updated).toLocaleDateString()}
                                    created={new Date(pack.created).toLocaleDateString()}
                                    onDeleteClick={() => {
                                        setPackId(pack._id);
                                        setDeleteMode(true);
                                    }}
                                    onEditClick={() => {
                                        setPackId(pack._id);
                                        setPackName(pack.name);
                                        setEditMode(true);
                                    }}
                                />
                            )
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
                        itemsTotalCount={cardPacksTotalCount}
                        changePageCount={onChangePageCount}
                        changePage={onChangePage}/>
                </div>
            </div>
        </div>
    )
}
