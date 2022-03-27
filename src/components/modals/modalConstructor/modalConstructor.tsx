import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import React from "react";
import {LoginModal} from "../loginModal/loginModal";

export const ModalConstructor = () => {
    const modalType = useAppSelector(state => state.ModalReducer.modalType);
    switch (modalType) {
        case 'Login':
            return React.cloneElement(<LoginModal/>)
        default:
            return null
    }

}