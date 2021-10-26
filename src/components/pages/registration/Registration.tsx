import React, {useEffect, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../Routes";
import {useDispatch, useSelector} from "react-redux";
import {RegisterResponseType, RootStateType} from "../../../types/types";
import {useFormik} from "formik";
import c from "./Registration.module.scss";
import {Spin} from "antd";
import {register} from "../../../bll/thunks/thunks";


export const Registration = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isDisabled, setDisabled] = useState<boolean>(false);

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
            debugger
            setDisabled(false);
        }
    }, [isLoading]);

    const formik = useFormik(
        {
            initialValues: {
                email: '',
                password: ''
            },
            onSubmit: values => {
                debugger
                setDisabled(true);
                dispatch(register({...values}));
            }
        }
    );

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
                        {...formik.getFieldProps('email')}
                    />
                </label>
                <label>
                    Password
                    <Input
                        id='password'
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                </label>
                <label>
                    Confirm password
                    <Input
                        id='confirmPassword'
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                </label>
                <div className={c.buttonContainer}>
                    <Button onClick={onCancelClick}>
                        Cancel
                    </Button>
                    <Button htmlType='submit' disabled={isDisabled}>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    )
}