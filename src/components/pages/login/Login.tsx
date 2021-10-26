import React, {ChangeEvent, useState} from 'react'
import {Input} from "../../common/Input/Input";
import {Checkbox} from "../../common/Checkbox/Checkbox";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {Button} from "../../common/Button/Button";
import c from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../../bll/thunks/thunks";
import {LoginResponseType, RootStateType} from "../../../types/types";
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
        onSubmit: values => {
            alert(JSON.stringify(values));
            // setButtonDisabled(true);
            // dispatch(logIn({email, password, rememberMe}));
        },
    });

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
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}/>
                </label>
                <label>
                    Password
                    <Input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                </label>
                <Checkbox
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
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