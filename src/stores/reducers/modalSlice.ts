import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Modal {
    modalType: string
}

const initialState: Modal = {
    modalType: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addModal(state, action: PayloadAction<string>) {
            state.modalType = action.payload;
        },
        removeModal(state) {
            state.modalType = '';
        }
    }
});

export const {addModal, removeModal} = modalSlice.actions;

export default modalSlice.reducer;