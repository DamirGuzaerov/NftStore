import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../utils/models/iuser";
import {fetchUser} from "./ActionCreators";
import {useNavigate} from "react-router-dom";
import {getCurrentUserLocalStorage} from "../../utils/hooks/getCurrentUserLocalStorage";
import {modalSlice} from "./modalSlice";

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
        getUser(state){
            const user = getCurrentUserLocalStorage();
            state.isLoading = false;
            state.name = user.name;
            state.wallet = user.ethAddress;
            state.token = user.sessionToken;
            state.error = '';
        }
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
export const {getUser} = userSlice.actions;
export default userSlice.reducer;