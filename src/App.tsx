import React from 'react';

import './App.css';
import {Routes, Route} from "react-router-dom";
import {Layout} from "./components/layouts/layout";
import {Homepage} from "./pages/home/homepage";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route element={<Homepage/>} index/>
            </Route>
        </Routes>
    );
}

export default App;
