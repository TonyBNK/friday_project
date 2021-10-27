import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./login/Login";
import {Registration} from "./registration/Registration";
import {Profile} from "./profile/Profile";
import {Error404} from "./error-404/Error404";
import {PasswordRecovery} from "./password-recovery/PasswordRecovery";
import {EnterNewPassword} from "./enter-new-password/EnterNewPassword";
import React from "react";
import {Test} from "./test/Test";


export const PATH = {
    TEST: '/test',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password_recovery',
    ENTER_NEW_PASSWORD: '/enter_new_password'
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
                <Route path={PATH.ENTER_NEW_PASSWORD} render={() => <EnterNewPassword/>}/>

                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}