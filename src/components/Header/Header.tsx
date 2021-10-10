import React from "react";
import c from './Header.module.scss';
import {PATH} from "../pages/Routes";
import { NavLink } from "react-router-dom";


export const Header = () => {
    return (
        <div className={c.navbar}>
            <div className={c.dropdown}>
                <button className={c.dropbtn}>Pages</button>
                <div className={c.dropdownContent}>
                    <NavLink to={PATH.TEST}
                             activeClassName={c.active}>Test</NavLink>
                    <NavLink to={PATH.LOGIN}
                             activeClassName={c.active}>Login</NavLink>
                    <NavLink to={PATH.REGISTRATION}
                             activeClassName={c.active}>Registration</NavLink>
                    <NavLink to={PATH.PROFILE}
                             activeClassName={c.active}>Profile</NavLink>
                    <NavLink to={PATH.PASSWORD_RECOVERY}
                             activeClassName={c.active}>Password Recovery</NavLink>
                    <NavLink to={PATH.ENTER_NEW_PASSWORD}
                             activeClassName={c.active}>Enter new password</NavLink>
                </div>
            </div>
        </div>
    )
}