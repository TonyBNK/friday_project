import React from "react";
import c from './Header.module.scss';
import {PATH} from "../pages/Routes";
import {NavLink} from "react-router-dom";
import {Button} from "../common/Button/Button";
import {useDispatch} from "react-redux";
import {logOut} from "../../bll/thunks/thunks";


type HeaderPropsType = {
    isLogged: boolean
}

export const Header: React.FC<HeaderPropsType> = (
    {
        isLogged
    }
) => {
    const dispatch = useDispatch();

    const onLogOutClickHandler = () => {
        dispatch(logOut());
    }

    return (
        <div className={c.navbar}>
            <NavLink to={PATH.TEST}
                     activeClassName={c.active}>Test</NavLink>
            <NavLink to={PATH.LOGIN}
                     activeClassName={c.active}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION}
                     activeClassName={c.active}>Registration</NavLink>
            <NavLink to={PATH.PROFILE}
                     activeClassName={c.active}>Profile</NavLink>
            <NavLink to={PATH.PASSWORD_RECOVERY}
                     activeClassName={c.active}>Password
                Recovery</NavLink>
            <NavLink to={PATH.ENTER_NEW_PASSWORD}
                     activeClassName={c.active}>Enter new
                password</NavLink>
            <NavLink to={PATH.PACKS}
                     activeClassName={c.active}>Packs</NavLink>
            <NavLink to={PATH.CARDS}
                     activeClassName={c.active}>Cards</NavLink>
            <NavLink to={PATH.MODAL}
                     activeClassName={c.active}>Modal</NavLink>
            {
                isLogged
                && <NavLink to={PATH.LOGIN}
                            onClick={onLogOutClickHandler}
                            style={{position: 'absolute', right: 0}}
                            activeClassName={c.active}>Log Out
                </NavLink>
            }
        </div>
    )
}