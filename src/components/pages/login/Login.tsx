import React, {ChangeEvent, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Checkbox} from "../../common/Checkbox/Checkbox";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Button} from "../../common/Button/Button";
import c from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../../bll/thunks/thunks";
import {
    FormikErrorType, LoginRequestType,
    LoginResponseType,
    RootStateType
} from "../../../types/types";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {Spin} from "antd";
import {useFormik} from "formik";


export const Login = () => {
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

    const dispatch = useDispatch();
    const {_id: userId} = useSelector<RootStateType, LoginResponseType>(
        state => state.login
    )
    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    )
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values: LoginRequestType) => {
            const errors: FormikErrorType = {};

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
            dispatch(logIn({...values}));
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

    if (userId) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={c.loginPageContainer}>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Email
                    <Input
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
                    <Input
                        id={'password'}
                        type="password"
                        style={passwordError ? errorStyle : undefined}
                        {...formik.getFieldProps('password')}
                    />
                </label>
                {
                    formik.touched.password && formik.errors.password
                        ? (<div style={{color: 'red'}}>{formik.errors.password}</div>)
                        : null
                }
                <Checkbox
                    id={'rememberMe'}
                    {...formik.getFieldProps('')}
                >
                    Remember me
                </Checkbox>
                <Button htmlType={'submit'} isDisabled={isButtonDisabled}>
                    Login
                </Button>
            </form>
        </div>
    )
}