import React from 'react';
import 'swiper/css'
import './App.css';
import {Routes, Route} from "react-router-dom";
import {Layout} from "./components/layouts/layout";
import {Homepage} from "./pages/home/homepage";
import {Profile} from "./pages/profile/profilepage";
import {RequireAuth} from "./utils/provider/authProvider";
import Collections from "./pages/collections/collections";
import {Nft} from "./pages/nft/nft";
import {DiscoverPage} from "./pages/discover/discoverPage";
import {VirtualCollection} from "./pages/collection/virtualCollection";
import {NftOwners} from "./components/ui/nftOwners/nftOwners";
import {NftInfo} from "./components/ui/nftInfo/nftInfo";
import {NftDetails} from "./components/ui/nftDetails/nftDetails";
import Collection from "./pages/collection/collection";
import {PreUploadNFT} from "./pages/preUploadNFT/preUploadNFT";
import {UploadNFT} from "./pages/uploadNFT/uploadNFT";
import {SettingsPage} from "./pages/settings/settingsPage";
import {UserPage} from "./pages/userPage/userPage";
import Moralis from "moralis";

function App() {
    Moralis.start({serverUrl:'https://bsnaqump47ti.usemoralis.com:2053/server', appId:"xqgXudEiFZ9pKlox3caOx08FRP52AQfwyOLghFxt"})

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route element={<Homepage/>} index/>
                <Route element={<UserPage/>} path={"/pageUser/:wallet"}/>
                <Route path={'/profile'} element={<RequireAuth>
                    <Profile/>
                </RequireAuth>
                }/>
                <Route path={'/preUpload'} element={<RequireAuth>
                    <PreUploadNFT/>
                </RequireAuth>}/>
                <Route path={'/upload'} element={<RequireAuth>
                    <UploadNFT/>
                </RequireAuth>}/>
                <Route path={'/settings'} element={<RequireAuth>
                    <SettingsPage/>
                </RequireAuth>}/>

                <Route element={<Collections/>} path={'collections'}/>
                <Route element={<VirtualCollection/>} path={'collections/:collectionName'}/>
                <Route element={<Nft/>} path={'/assets/:address/:token_id'}>
                    <Route element={<NftOwners/>} path={'/assets/:address/:token_id/owners'}/>
                    <Route element={<NftInfo/>} path={'/assets/:address/:token_id/info'}/>
                    <Route element={<NftDetails/>} path={'/assets/:address/:token_id/details'}/>
                </Route>
                <Route element={<DiscoverPage/>} path={'/discover'}/>
            </Route>
        </Routes>
    );
}

export default App;
