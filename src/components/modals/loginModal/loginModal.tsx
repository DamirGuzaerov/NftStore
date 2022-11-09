import {ModalTemplate} from "../modalConstructor/modalTemplate";
import defaultModalStyles from "../modalConstructor/modalTemplateStyles.module.sass"
import {fetchUser} from "../../../stores/reducers/ActionCreators";
import {useDispatch, useSelector} from "react-redux";
import Icon from "../../ui/icon/icon";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {removeModal} from "../../../stores/reducers/modalSlice";
import {useEffect, useState} from "react";

export const LoginModal = () => {
    const dispatch = useDispatch()
    const loading = useAppSelector(state => state.UserReducer.isLoading);
    const [clicked, setClicked] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (clicked && !loading) {
            dispatch(removeModal());
            navigate('/profile');
        }
    }, [loading, clicked]);


    const signIn = () => {
        try {
            dispatch(fetchUser());
        } catch (e) {
            dispatch(removeModal());
            setClicked(false);
        }
        setClicked(true);
    }
    if (loading) {
        return <p>loading</p>
    }
    return (
        <ModalTemplate title={"Connect Wallet"}>
            <div className={defaultModalStyles.modal_content}>
                <div className={defaultModalStyles.modal__form_container}>
                    <button onClick={() => signIn()} className={defaultModalStyles.modal__sendButton}>
                        <div className={defaultModalStyles.btnIcon}>
                            <Icon height={24} name={'metamaskLogo'} width={24}/>
                        </div>
                        Sign in with Metamask
                    </button>
                </div>
            </div>
        </ModalTemplate>
    );
}