import {AppDispatch} from "../mainStore";
import axios from "axios";
import {nftSlice} from "./nftSlice";


export const fetchNFT = (urls: string[]) => async (dispatch: AppDispatch) =>{
    try {
        dispatch(nftSlice.actions.nftsFetching());
        let data: string[] = [];
        urls.map(async url => {
            const response = await axios.get(url);
            data = [...data, response.data.image_url]
        })
        dispatch(nftSlice.actions.nftsFetchingSuccess(data))
    } catch (e) {
        // @ts-ignore
        dispatch(nftSlice.actions.nftsFetchingError(e.message))
    }
}