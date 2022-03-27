import {ModalTemplate} from "../modalConstructor/modalTemplate";
import defaultModalStyles from "../modalConstructor/modalTemplateStyles.module.sass"
import {fetchUser} from "../../../stores/reducers/ActionCreators";
import {useDispatch} from "react-redux";
import Icon from "../../ui/icon/icon";

export const LoginModal = () => {
    const dispatch = useDispatch()
    return(
            <ModalTemplate title={"Connect Wallet"}>
                <div className={defaultModalStyles.modal_content}>
                    <div className={defaultModalStyles.modal__form_container}>
                        <button onClick={()=>dispatch(fetchUser())} className={defaultModalStyles.modal__sendButton}>
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