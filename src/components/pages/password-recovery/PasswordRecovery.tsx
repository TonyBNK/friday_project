import React, {ChangeEvent, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";


export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>('');


    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const onButtonClick = () => {
        alert(`email: ${email}`);
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
                Enter your email address and we will send you further instructions
            </p>
            <Button onClick={onButtonClick}>
                Send instructions
            </Button>
        </div>
    )
}