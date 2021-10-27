import React, {useEffect} from 'react';
import './App.module.scss';
import {Header} from "./components/Header/Header";
import {Routes} from "./components/pages/Routes";
import {useDispatch, useSelector} from "react-redux";
import {setAppInitialize} from "./bll/thunks/thunks";
import {AppStateType, RootStateType} from "./types/types";
import {Spin} from "antd";


function App() {
    const {isLoading, isInitialized} = useSelector<RootStateType, AppStateType>(
        state => state.app
    );
    const hasUserId = useSelector<RootStateType, boolean>(
        state => !!state.login._id
    );
    const dispatch = useDispatch();

    const onLogOutClickHandler = () => {
        //dispatch(logOut());
    }

    useEffect(() => {
        dispatch(setAppInitialize());
    }, []);

    if (!isInitialized) {
        return <div style={{
            position: 'fixed',
            width: '100%',
            top: '30%',
            textAlign: 'center'
        }}>
            <Spin size={'large'}/>
        </div>
    }

    return (
        <div className="App">
            <Header isLogged={hasUserId}/>
            <Routes/>
        </div>
    );
}

export default App;
