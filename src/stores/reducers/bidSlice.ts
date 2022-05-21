import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../utils/models/iuser";
import {fetchUser} from "./ActionCreators";
import {useNavigate} from "react-router-dom";
import {a} from "react-spring";
import {modalSlice} from "./modalSlice";

interface IBid {
    address?: string,
    token?: string,
    isLoading?: boolean,
    error?: string
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
        }
    }
});

export const {addBid} = bidSlice.actions;

export default bidSlice.reducer;