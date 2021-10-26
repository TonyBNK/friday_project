import React, {useEffect, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../Routes";
import {useDispatch, useSelector} from "react-redux";
import {
    RegisterErrorType,
    RegisterResponseType,
    RootStateType
} from "../../../types/types";
import {useFormik} from "formik";
import c from "./Registration.module.scss";
import {Spin} from "antd";
import {register} from "../../../bll/thunks/thunks";


export const Registration = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

    const isLoading = useSelector<RootStateType, boolean>(
        state => state.app.isLoading
    );
    const {
        error,
        isRegistered
    } = useSelector<RootStateType, RegisterResponseType>(
        state => state.registration
    );

    useEffect(() => {
        if (!isLoading) {
            setButtonDisabled(false);
        }
    }, [isLoading]);

    const formik = useFormik(
        {
            initialValues: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            validate: (values) => {
                const errors: RegisterErrorType = {};
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

                if (!values.confirmPassword) {
                    errors.confirmPassword = 'Required';
                } else if (values.confirmPassword !== values.password) {
                    errors.confirmPassword = 'Incorrect confirmation';
                }

                return errors;
            },
            onSubmit: values => {
                setButtonDisabled(true);
                dispatch(register({...values}));
            }
        }
    );

    const errorStyle = {
        border: '1px solid red',
        outlined: false
    }

    const [emailError, passwordError, confirmPasswordError] = [
        formik.touched.email && formik.errors.email,
        formik.touched.password && formik.errors.password,
        formik.touched.confirmPassword && formik.errors.confirmPassword
    ];

    const onCancelClick = () => {
        history.push(PATH.LOGIN);
    }

    if (isLoading) {
        return <div style={{
            position: 'fixed',
            width: '100%',
            top: '30%',
            textAlign: 'center'
        }}>
            <Spin size={'large'}/>
        </div>
    }

    if ((isRegistered && !error)) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={c.registrationContainer}>
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Email
                    <Input
                        id='email'
                        type="text"
                        style={emailError ? errorStyle : undefined}
                        {...formik.getFieldProps('email')}
                    />
                </label>
                {
                    emailError
                        ? <div
                            style={{color: 'red'}}>{formik.errors.email}</div>
                        : null
                }
                <label>
                    Password
                    <Input
                        id='password'
                        type="password"
                        style={passwordError ? errorStyle : undefined}
                        {...formik.getFieldProps('password')}
                    />
                </label>
                {
                    passwordError
                        ? <div
                            style={{color: 'red'}}>{formik.errors.password}</div>
                        : null
                }
                <label>
                    Confirm password
                    <Input
                        id='confirmPassword'
                        type="password"
                        style={confirmPasswordError ? errorStyle : undefined}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                </label>
                {
                    confirmPasswordError
                        ? <div
                            style={{color: 'red'}}>{formik.errors.confirmPassword}</div>
                        : null
                }
                <div className={c.buttonContainer}>
                    <Button onClick={onCancelClick}>
                        Cancel
                    </Button>
                    <Button htmlType='submit' disabled={isButtonDisabled}>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    )
}