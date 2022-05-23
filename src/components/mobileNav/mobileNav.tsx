import {useDispatch} from "react-redux";
import {useAuth} from "../../utils/hooks/useAuth";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import {addModal, removeModal} from "../../stores/reducers/modalSlice";
import {getBalance} from "../../utils/hooks/getNfts";
import styles from "./mobileNav.module.sass"
import {Link} from "react-router-dom";
import {DefaultButton} from "../ui/buttons/default-button";
import pic from "../../assets/images/tempImg/nftPreviewImg.png";


export const MobileNav = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const [balance, setBalance] = useState();
    const selector = useAppSelector(state => state.UserReducer);
    const openLogin = () => {
        dispatch(removeModal())
        dispatch(addModal('Login'));
    }
    const closeModal = () => {
        dispatch(removeModal());
    }
    useEffect(() => {
        if (auth) {
            getBalance(selector.wallet).then((r) => {
                setBalance(r);
            })
        }
    }, [selector])

    return <>
        <div className={styles.menu_wrapper}>
            <div className={styles.header__content}>
                <nav className={styles.header__nav}>
                    <Link to={'/discover'} >
                        Discover
                    </Link>
                    <Link to={'/'} >
                        How it works
                    </Link>
                    {!auth ? (
                            <DefaultButton type={'action'} paddingRightLeft={24} paddingTopBottom={14}
                                           value={'Sign in'}
                                           func={() => openLogin()}/>) :
                        (<>
                            <div className={styles.profile_header_wrapper}>
                                <Link to={'/preUpload'} className={styles.upload_button}>
                                    <DefaultButton type={'submit'} paddingRightLeft={16} paddingTopBottom={12}
                                                   value={'Upload'}
                                                   func={() => closeModal}/>
                                </Link>
                                <Link to={'/profile'} className={styles.profile_header}>
                                    <img src={pic} className={styles.profile_header_image} alt={'avatar'}/>
                                    <p className={styles.balance}>
                                        {balance}
                                    </p>
                                    <p className={styles.eth}>
                                        ETH
                                    </p>
                                </Link>
                            </div>
                        </>)}
                </nav>
            </div>
        </div>
    </>
}