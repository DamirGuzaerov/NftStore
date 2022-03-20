import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface NFTState {
    nfts: string[],
    isLoading: boolean,
    error: string
}
const initialState: NFTState = {
    nfts: [],
    isLoading: false,
    error: ''
}
export const nftSlice = createSlice({
    name: 'nftsSlider',
    initialState,
    reducers: {
        nftsFetching(state) {
            state.isLoading = true;
        },
        nftsFetchingSuccess(state, action: PayloadAction<string[]>) {
            state.isLoading = false;
        },
        nftsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
        }
    }
})