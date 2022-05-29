import Icon from "../ui/icon/icon";
import styles from './header.module.sass';
import logo from './../../assets/logo.svg'
import {Link} from "react-router-dom";
import {DefaultButton} from "../ui/buttons/default-button";
import {addModal, removeModal} from "../../stores/reducers/modalSlice";
import {useDispatch} from "react-redux";
import {useAuth} from "../../utils/hooks/useAuth";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getBalance} from "../../utils/hooks/getNfts";
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import pic from '../../assets/images/tempImg/nftPreviewImg.png';
import {MobileNav} from "../mobileNav/mobileNav";


export const Header = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const openLogin = () => {
        dispatch(removeModal())
        dispatch(addModal('Login'));
    }
    const closeModal = () => {
        dispatch(removeModal());
    }
    useEffect(() => {
        window.addEventListener("resize", checkWindowSize)
        return () => {
            window.removeEventListener("resize", checkWindowSize)
        }
    }, [])
    const checkWindowSize = () => {
        if (window.innerWidth > 675) setIsOpen(false)
    }
    return (
        <div>
            <header>
                <div className={styles.header_wrapper}>
                    <div className={styles.header__left_content}>
                        <Link to={'/'} className={styles.logo}>
                            <object data={logo} type=""/>
                            <p className={styles.logo_name}>NFT-Store</p>
                        </Link>
                        <nav>
                            <Link to={'/discover'}>
                                Discover
                            </Link>
                            <Link to={'/'}>
                                How it works
                            </Link>
                        </nav>
                    </div>
                    <div className={styles.search_wrapper}>
                        <div className={styles.buttons_container}>

                            {!auth ? (
                                    <DefaultButton type={'action'} paddingRightLeft={16} paddingTopBottom={12}
                                                   value={'Sign in'}
                                                   func={() => openLogin()}/>) :
                                (<>
                                    <Link to={'/preUpload'} className={styles.upload_button}>
                                        <DefaultButton type={'submit'} paddingRightLeft={16} paddingTopBottom={12}
                                                       value={'Upload'}
                                                       func={() => closeModal}/>
                                    </Link>

                                    <Link to={'/profile'} className={styles.profile_header}>
                                        <img src={pic} className={styles.profile_header_image} alt={'avatar'}/>
                                        Profile
                                    </Link>
                                </>)}
                        </div>
                    </div>
                    <button className={styles.mobileNavigation} onClick={() => setIsOpen(!isOpen)}>
                        <Icon name={'burger'} width={32} height={32}/>
                    </button>
                </div>
            </header>
            {isOpen && <MobileNav/>}
        </div>
    );
}