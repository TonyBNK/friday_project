import React, {useEffect, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Checkbox} from "../../common/Checkbox/Checkbox";
import {Button} from "../../common/Button/Button";
import c from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../../bll/thunks/thunks";
import {
    LoginFormikErrorType,
    LoginRequestType,
    RootStateType
} from "../../../types/types";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {Spin} from "antd";
import {useFormik} from "formik";


export const Login = () => {
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

    const dispatch = useDispatch();
    const isLogged = useSelector<RootStateType, boolean>(
        state => state.login.isLogged
    )
    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    )

    useEffect(() => {
        if (!isLoading) {
            setButtonDisabled(false);
        }
    }, [isLoading]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values: LoginRequestType) => {
            const errors: LoginFormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}$/.test(values.password)) {
                errors.password = 'Invalid password';
            }

            return errors;
        },
        onSubmit: values => {
            setButtonDisabled(true);
            dispatch(logIn(values));
        },
    });

    const errorStyle = {
        border: '1px solid red',
        outlined: false
    }

    const [emailError, passwordError] = [
        formik.touched.email && formik.errors.email,
        formik.touched.password && formik.errors.password
    ];

    if (isLoading) {
        return <div style={{
            position: 'fixed',
            width: '100%',
            top: '30%',
            textAlign: 'center'
        }}>
            <Spin size={"large"}/>
        </div>
    }

    if (isLogged) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={c.loginPageContainer}>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Email
                    <input
                        id='email'
                        type="text"
                        style={emailError ? errorStyle : undefined}
                        {...formik.getFieldProps('email')}/>
                </label>
                {
                    formik.touched.email && formik.errors.email
                        ? (
                            <div style={{color: 'red'}}>{formik.errors.email}</div>)
                        : null
                }
                <label>
                    Password
                    <input
                        id={'password'}
                        type="password"
                        style={passwordError ? errorStyle : undefined}
                        {...formik.getFieldProps('password')}
                    />
                </label>
                {
                    formik.touched.password && formik.errors.password
                        ? (<div
                            style={{color: 'red'}}>{formik.errors.password}</div>)
                        : null
                }
                <div className={c.buttonContainer}>
                    <label>
                        Remember me
                        <input
                            type="checkbox"
                            id={'rememberMe'}
                            {...formik.getFieldProps('')}/>
                    </label>
                    <button type={'submit'} disabled={isButtonDisabled}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}