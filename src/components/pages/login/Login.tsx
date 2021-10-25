import React, {ChangeEvent, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Checkbox} from "../../common/Checkbox/Checkbox";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Button} from "../../common/Button/Button";
import c from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../../bll/thunks/thunks";
import {RootStateType} from "../../../types/types";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";


export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    
    const dispatch = useDispatch();
    const userId = useSelector<RootStateType, string | undefined>(
        state => state.login._id
    )

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }
    const onRememberMeChange = (e: CheckboxChangeEvent) => {
        setRememberMe(e.target.checked);
    }
     const onButtonClick = () => {
        dispatch(logIn({email, password, rememberMe}));
    }
    
    if (userId){
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={c.loginPageContainer}>
            <h2>Login</h2>
            <Input
                type="text"
                name="email"
                value={email}
                onChange={onEmailChange}
            />
            <Input
                type="password"
                name="password"
                value={password}
                onChange={onPasswordChange}
            />
            <Checkbox
                checked={rememberMe}
                onChange={onRememberMeChange}
            >
                Remember me
            </Checkbox>
            <Button onClick={onButtonClick}>
                Login
            </Button>
        </div>
    )
}