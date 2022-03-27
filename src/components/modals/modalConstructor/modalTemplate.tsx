import {Portal} from '../portal/portal'
import {FC, MutableRefObject, useRef} from "react";
import styles from './modalTemplateStyles.module.sass';
import {useModalClose} from "../../../utils/hooks/close-modal-hook";
import {removeModal} from "../../../stores/reducers/modalSlice";
import {useDispatch} from "react-redux";

export interface IModal {
    children: any
}

export const ModalTemplate:FC<IModal> = ({children}: IModal) => {
    const ref = useRef() as MutableRefObject<HTMLInputElement>;
    const dispatch = useDispatch();
    useModalClose(ref, dispatch(removeModal));
    console.log(children);

    return(
        <Portal elem={'elem'} role={'loginModal'} className={'portal-root'}>
            <div className={styles.overlay} ref={ref}>
                {children}
            </div>
        </Portal>
    );
}