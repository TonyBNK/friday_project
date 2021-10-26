import React, {ChangeEvent, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    PasswordRecoveryResponseType,
    RootStateType
} from "../../../types/types";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {recoverPassword} from "../../../bll/thunks/thunks";


export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch();
    const {
        error,
        info
    } = useSelector<RootStateType, PasswordRecoveryResponseType>(
        state => state.passwordRecovery
    )

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const onButtonClick = () => {
        dispatch(recoverPassword(email));
    }

    if (info && !error) {
        return <Redirect to={PATH.ENTER_NEW_PASSWORD}/>
    }

    return (
        <div>
            <h2>Forgot your password?</h2>
            <Input
                type="text"
                name="email"
                value={email}
                onChange={onEmailChange}
            />
            <p>
                Enter your email address and we will send you further
                instructions
            </p>
            <Button>
                Send instructions
            </Button>
        </div>
    )
}