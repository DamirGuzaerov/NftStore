import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IBid {
    address?: string,
    token?: string,
    isLoading?: boolean,
    error?: string
    price?: string
}

const initialState: IBid = {
    address: '',
    token: '',
    isLoading: false
}

export const bidSlice = createSlice({
    name: 'bid',
    initialState,
    reducers: {
        addBid(state, action: PayloadAction<IBid>) {
            state.token = action.payload.token;
            state.address = action.payload.address;
            state.isLoading = true
        },
        setPrice(state, action: PayloadAction<string>) {
            state.price = action.payload;
        }
    }
});

export const {addBid, setPrice} = bidSlice.actions;

export default bidSlice.reducer;