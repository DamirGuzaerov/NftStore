import React from 'react';
import 'swiper/css'
import './App.css';
import {Routes, Route} from "react-router-dom";
import {Layout} from "./components/layouts/layout";
import {Homepage} from "./pages/home/homepage";
import {Profile} from "./pages/profile/profilepage";
import {RequireAuth} from "./utils/provider/authProvider";
import Collection from "./pages/collection/collection";
import Collections from "./pages/collections/collections";
import {Nft} from "./pages/nft/nft";

function App() {

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route element={<Homepage/>} index/>
                <Route path={'/profile'} element={<RequireAuth>
                    <Profile/>
                </RequireAuth>}/>
                <Route element={<Collections/>} path={'collections'}/>
                <Route element={<Collection/>} path={'collections/:collectionName'}/>
                <Route element={<Nft/>} path={'assets/:address/:token_id'}/>
            </Route>
        </Routes>
    );
}

export default App;
