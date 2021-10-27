import React, {useEffect, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    PasswordRecoveryFormikErrorType,
    PasswordRecoveryResponseType,
    RootStateType
} from "../../../types/types";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {useFormik} from "formik";
import c from "./PasswordRecovery.module.scss";
import {recoverPassword} from "../../../bll/thunks/thunks";


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
        validate: (values) => {
            const errors: PasswordRecoveryFormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(recoverPassword(values.email));
        }
    });

    const errorStyle = {
        border: '1px solid red',
        outlined: false
    }

    const [emailError] = [
        formik.touched.email && formik.errors.email
    ];

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
                        style={emailError ? errorStyle : undefined}
                        {...formik.getFieldProps('email')}
                    />
                    Enter your email address and we will send you further
                    instructions
                </label>
                {
                    emailError
                        ? <div
                            style={{color: 'red'}}>{formik.errors.email}</div>
                        : null
                }
                <Button disabled={isButtonDisabled} htmlType={'submit'}>
                    Send instructions
                </Button>
            </form>
        </div>
    )
}