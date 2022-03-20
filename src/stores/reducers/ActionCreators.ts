import {AppDispatch} from "../mainStore";
import axios from "axios";
import {nftSlice} from "./nftSlice";


export const fetchNFT = () => async (dispatch: AppDispatch, url: string) =>{
    try {
        dispatch(nftSlice.actions.nftsFetching());
        const response = await axios.get(url)
        dispatch(nftSlice.actions.nftsFetchingSuccess(response.data.image_url))
    } catch (e) {
        // @ts-ignore
        dispatch(nftSlice.actions.nftsFetchingError(e.message))
    }
}