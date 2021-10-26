import React from 'react'
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {useDispatch, useSelector} from "react-redux";
import {RegisterResponseType, RootStateType} from "../../../types/types";
import {useFormik} from "formik";
import c from "./Registration.module.scss";


export const Registration = () => {
    const dispatch = useDispatch();

    const formik = useFormik(
        {
            initialValues: {
                email: '',
                password: ''
            },
            onSubmit: values => {
                alert(JSON.stringify(values));
                // dispatch(register({email, password}));
            },
            onReset: () => {
                return <Redirect to={PATH.LOGIN}/>
            }
        }
    );

    const {
        isRegistered,
        error
    } = useSelector<RootStateType, RegisterResponseType>(
        state => state.registration
    )

    if (isRegistered) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={c.registrationContainer}>
            <h2>Sign Up</h2>
            <form>
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
                    <Button htmlType='submit'>
                    Register
                </Button>
                    <Button htmlType='reset'>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}