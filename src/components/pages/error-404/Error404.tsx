import React from 'react'
import c from './Error404.module.scss';


export const Error404 = () => {
    return (
        <div className={c.error}>
            <div className={c.e404}>404</div>
            <div className={c.title}>Page not found!</div>
            <div className={c.pic}>̿ ̿ ̿ ̿ '̿'\̵͇̿̿\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿</div>
        </div>
    )
}