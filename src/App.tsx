import React from 'react';
import 'swiper/css'
import './App.css';
import {Routes, Route} from "react-router-dom";
import {Layout} from "./components/layouts/layout";
import {Homepage} from "./pages/home/homepage";
import Collection from "./pages/collection/collection";
import Collections from "./pages/collections/collections";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route element={<Homepage/>} index/>
                <Route element={<Collections/>} path={'collections'}>
                    <Route element={<Collection></Collection>} path={':collectionName'}></Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
