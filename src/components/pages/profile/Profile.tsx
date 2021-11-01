import React from 'react'
import {useSelector} from "react-redux";
import {ProfileResponseType, RootStateType} from "../../../types/types";
import c from "./Profile.module.scss";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";


export const Profile = () => {
    const {avatar, name, _id} = useSelector<RootStateType, ProfileResponseType>(state => state.profile);
    const isLogged = useSelector<RootStateType, boolean>(
        state => state.login.isLogged
    )

    if (!isLogged) {
        return <Redirect to={PATH.LOGIN}/>
    }
    return (
        <div className={c.profileContainer}>
            <img src={avatar} alt="ava"/>
            <div className={c.name}>
                <b>Name</b>: {name}
            </div>
            <div className={c.userId}>
                <b>My ID</b>: {_id}
            </div>
        </div>
    )
}
