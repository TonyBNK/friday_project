import React, {useEffect, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    PasswordRecoveryResponseType,
    RootStateType
} from "../../../types/types";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {useFormik} from "formik";
import c from "./PasswordRecovery.module.scss";


export const PasswordRecovery = () => {
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

    const dispatch = useDispatch();

    const {
        error,
        info
    } = useSelector<RootStateType, PasswordRecoveryResponseType>(
        state => state.passwordRecovery
    );
    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    );

    useEffect(() => {
        if (!isLoading) {
            setButtonDisabled(false);
        }
    }, [isLoading]);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            // dispatch(recoverPassword(email));
        }
    });

    if (info && !error) {
        return <Redirect to={PATH.ENTER_NEW_PASSWORD}/>
    }

    return (
        <div className={c.pasRecContainer}>
            <h2>Forgot your password?</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="">
                    <Input
                        id="email"
                        type="text"
                        {...formik.getFieldProps('email')}
                    />
                    Enter your email address and we will send you further
                    instructions
                </label>
                <Button disabled={isButtonDisabled} htmlType={'submit'}>
                    Send instructions
                </Button>
            </form>
        </div>
    )
}