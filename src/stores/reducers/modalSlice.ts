import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import React from "react";

export interface Modal {
    currentModal?: React.ReactNode;
}

const initialState: Modal = {
    currentModal: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addModal(state, action: PayloadAction<Modal>) {
            state.currentModal = action.payload.currentModal;
        },
        removeModal(state) {
            state.currentModal = null;
        }
    }
});

export const {addModal, removeModal} = modalSlice.actions;

export default modalSlice.reducer;