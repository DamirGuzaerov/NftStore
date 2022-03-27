import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../utils/models/iuser";
import {fetchUser} from "./ActionCreators";

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
        userFetchingSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.name = action.payload.name;
            state.wallet = action.payload.wallet;
            state.token = action.payload.token;
            state.error = '';
        },
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
    extraReducers: {
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
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

export const {userFetching, userFetchingError, userFetchingSuccess} = userSlice.actions;

export default userSlice.reducer;