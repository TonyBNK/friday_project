import React, {ChangeEvent, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Checkbox} from "../../common/Checkbox/Checkbox";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Button} from "../../common/Button/Button";
import c from "./Login.module.scss";


export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

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
        alert(`email: ${email}\npassword: ${password}\nremember me: ${rememberMe}`);
    }

    return (
        <div className={c.loginPageContainer}>
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
                text={'Remember me'}
                value={rememberMe}
                onChange={onRememberMeChange}
            />
            <Button onClick={onButtonClick}>
                Login
            </Button>
        </div>
    )
}