import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import React from "react";

export const ModalConstructor = () => {
    const modal = useAppSelector(state => state.ModalReducer.currentModal);
    const CurrentModal = modal;

    if (modal) {
        // @ts-ignore
        return React.cloneElement(<CurrentModal/>)
    } else {
        return null;
    }
}