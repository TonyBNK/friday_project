import React, {ChangeEvent, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";


export const Registration = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [redirect, setRedirect] = useState<boolean>(false);

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }
    const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value);
    }
    const onRegisterClick = () => {
        alert(`${email} ${password} ${confirmPassword}`);
    }

    const onCancelClick = () => {
        setRedirect(true);
    }

    if (redirect){
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <h2>Sign Up</h2>
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
            <Input
                type="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
            />
            <Button onClick={onRegisterClick}>
                Register
            </Button>
            <Button onClick={onCancelClick}>
                Cancel
            </Button>
        </div>
    )
}