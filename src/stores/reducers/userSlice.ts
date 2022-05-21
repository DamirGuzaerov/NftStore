import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../utils/models/iuser";
import {fetchUser} from "./ActionCreators";
import {useNavigate} from "react-router-dom";

const initialState: IUser = {
    name: '',
    wallet: '',
    token: '',
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            console.log(action)
            state.isLoading = false;
            state.name = action.payload.name;
            state.wallet = action.payload.wallet;
            state.token = action.payload.token;
            state.error = '';
        },
        [fetchUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default userSlice.reducer;