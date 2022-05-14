import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import React, {cloneElement} from "react";
import {LoginModal} from "../loginModal/loginModal";
import styles from "../modalConstructor/modalTemplateStyles.module.sass"
import {PlaceBidModal} from "../placeBidModal/placeBidModal";

export const ModalConstructor = () => {

    const modalType = useAppSelector(state => state.ModalReducer.modalType);
    switch (modalType) {
        case 'Login':
            return <div className={styles.overlay}>{cloneElement(<LoginModal/>)}</div>
        case 'PlaceBid':
            return <div className={styles.overlay}>{cloneElement(<PlaceBidModal/>)}</div>
        default:
            return null
    }
}