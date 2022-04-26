import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchOwners} from "./ActionCreators";
export interface IOwner {
    token_address: string,
    token_id?: string,
    block_number_minted?: string,
    owner_of: string,
    block_number?: string,
    token_hash?: string,
    amount?: number,
    contract_type?: string,
    name?: string,
    symbol?: string,
    token_uri?: string,
    metadata?: object,
    synced_at?: string,
}

interface IOwners {
    owners: IOwner[],
    loading: boolean,
    error: string
}

const initialState: IOwners  = {
    owners: [],
    loading: false,
    error: ''
}

export const ownerSlice = createSlice({
    name: 'owners',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchOwners.fulfilled.type]: (state, action: PayloadAction<IOwner[]>) => {
            state.owners = action.payload;
        },
        [fetchOwners.pending.type]: (state) => {

        },
        [fetchOwners.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
})

export default ownerSlice.reducer;