import React from 'react';
import './App.module.scss';
import {Header} from "./components/Header/Header";
import {Routes} from "./components/pages/Routes";


function App() {
    return (
        <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;
