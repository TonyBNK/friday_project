import React from 'react';
import './App.module.scss';
import {Redirect, Route} from "react-router-dom";
import {Login} from "./components/pages/login/Login";
import {Registration} from "./components/pages/registration/Registration";
import {Profile} from "./components/pages/profile/Profile";
import {Error404} from "./components/pages/error-404/Error404";
import {PasswordRecovery} from "./components/pages/password-recovery/PasswordRecovery";
import {EnterNewPassword} from "./components/pages/enter-new-password/EnterNewPassword";
import {Test} from "./components/pages/test/Test";


function App() {
    return (
        <div className="App">
            <Redirect to={'/test'}/>
            <Route
                path={'/login'}
                render={() => <Login/>}
            />
            <Route
                path={'/registration'}
                render={() => <Registration/>}
            />
            <Route
                path={'/profile'}
                render={() => <Profile/>}
            />
            <Route
                path={'/error404'}
                render={() => <Error404/>}
            />
            <Route
                path={'/password_recovery'}
                render={() => <PasswordRecovery/>}
            />
            <Route
                path={'/enter_new_password'}
                render={() => <EnterNewPassword/>}
            />
            <Route
                path={'/test'}
                render={() => <Test/>}
            />
        </div>
    );
}

export default App;
