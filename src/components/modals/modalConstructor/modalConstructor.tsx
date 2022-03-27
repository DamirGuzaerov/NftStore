import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import React, {cloneElement} from "react";
import {LoginModal} from "../loginModal/loginModal";
import styles from "../modalConstructor/modalTemplateStyles.module.sass"

export const ModalConstructor = () => {

    const modalType = useAppSelector(state => state.ModalReducer.modalType);
    switch (modalType) {
        case 'Login':
            return <div className={styles.overlay}>{cloneElement(<LoginModal/>)}</div>
        default:
            return null
    }
}