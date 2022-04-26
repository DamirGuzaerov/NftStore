import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ModalReducer from './reducers/modalSlice'
import UserReducer from "./reducers/userSlice";
import OwnerReducer from './reducers/ownerSlice'

const rootReducer = combineReducers({
    ModalReducer,
    UserReducer,
    OwnerReducer
});
export const mainStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof mainStore>;
export type AppDispatch = AppStore["dispatch"];