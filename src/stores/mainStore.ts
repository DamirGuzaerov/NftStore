import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ModalReducer from './reducers/modalSlice'

const rootReducer = combineReducers({
    ModalReducer
});
export const mainStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof mainStore>;
export type AppDispatch = AppStore["dispatch"];