import {Portal} from '../portal/portal'
import {FC, MutableRefObject, useRef} from "react";
import styles from './modalTemplateStyles.module.sass';
import {useModalClose} from "../../../utils/hooks/close-modal-hook";
import {removeModal} from "../../../stores/reducers/modalSlice";
import {useDispatch} from "react-redux";
import Icon from "../../ui/icon/icon";

export interface IModal {
    title:string
    children: any
}

export const ModalTemplate:FC<IModal> = ({title,children}: IModal) => {
    const ref = useRef() as MutableRefObject<HTMLInputElement>;
    const dispatch = useDispatch();
    useModalClose(ref, dispatch(removeModal));

    return(
        <Portal elem={'elem'} role={'loginModal'} className={'portal-root'}>
            <div className={styles.modalOverlay} ref={ref}>
                <div className={styles.modal__container}>
                    <div className={styles.modal__firstrow}>
                        <h2 className={styles.title}>{title}</h2>
                        <button className={styles.modal__closeButton} onClick={() => dispatch(removeModal())}>
                            <Icon name={'close'} width={24} height={24}/>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
}