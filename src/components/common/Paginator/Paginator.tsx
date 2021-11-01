import React, {ChangeEvent, useState} from "react";
import c from "./Paginator.module.scss";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../types/types";


type PaginatorPropsType = {
    page: number
    pageCount: number
    itemsTotalCount: number
    changePageCount: (pageCount: number) => void
    changePage: (page: number) => void
}
export const Paginator: React.FC<PaginatorPropsType> = React.memo((
    {
        page,
        pageCount,
        itemsTotalCount,
        changePageCount,
        changePage,
    }
) => {
    const pagesCount = Math.ceil(itemsTotalCount / pageCount);
    const portionSize = 10;

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    const pageCountValue = useSelector<RootStateType, number | undefined>(
        state => state.packs.request.pageCount
    )

    const onPreviousClick = () => {
        setPortionNumber(portionNumber - 1);
    }
    const onNextClick = () => {
        setPortionNumber(portionNumber + 1);
    }
    const onChangePageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        changePageCount(+e.target.value);
    }

    const pagesList = pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
        const onChangeCurrentPageHandler = () => {
            changePage(p);
        }

        return (
            <span
                className={page === p ? c.pageSelected : ''}
                onClick={onChangeCurrentPageHandler}
                style={{margin: '0 5px', cursor: 'pointer'}}
            >
                {p}
            </span>
        )
    });

    return (
        <div className={c.paginatorContainer}>
            <button
                onClick={onPreviousClick}
                disabled={portionNumber <= 1}>
                {'<'}
            </button>
            {pagesList}
            <button
                onClick={onNextClick}
                disabled={portionCount <= portionNumber}>
                {'>'}
            </button>
            <label>
                <select
                    name="countOfItems"
                    onChange={onChangePageCount}
                    value={pageCountValue}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select> Items per page
            </label>
        </div>
    )
});