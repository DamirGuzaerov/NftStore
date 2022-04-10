import Icon from "../ui/icon/icon";
import styles from './header.module.sass';
import logo from './../../assets/logo.svg'
import {Link} from "react-router-dom";
import {Search} from "../ui/search/search";
import {DefaultButton} from "../ui/buttons/default-button";
import {addModal, removeModal} from "../../stores/reducers/modalSlice";
import {useDispatch} from "react-redux";
import {useAuth} from "../../utils/hooks/useAuth";
import {useEffect, useState} from "react";
import {getBalance} from "../../utils/hooks/getNfts";
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import pic from '../../assets/images/tempImg/nftPreviewImg.png';


export const Header = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const [balance, setBalance] = useState();

    const selector = useAppSelector(state => state.UserReducer);

    const openLogin = () => {
        dispatch(addModal('Login'));
        console.log('opened')
    }

    const closeLogin = () => {
        dispatch(removeModal());
    }

    useEffect(() => {
        if(auth) {
            getBalance(selector.wallet).then((r) => {
                setBalance(r);
            })
        }
    }, [selector])

    return (
        <header>
            <div className={styles.header_wrapper}>
                <div className={styles.header__left_content}>
                    <Link to={'/'} className={styles.logo}>
                        <object data={logo} type=""/>
                        <p className={styles.logo_name}>NFT-Store</p>
                    </Link>
                    <nav>
                        <Link to={'/'}>
                            Discover
                        </Link>
                        <Link to={'/'}>
                            How it works
                        </Link>
                    </nav>
                </div>
                <div className={styles.search_wrapper}>
                    <Search/>
                    <div className={styles.buttons_container}>
                        <DefaultButton type={'submit'} paddingRightLeft={16} paddingTopBottom={12} value={'Upload'}
                                       func={() => closeLogin}/>
                        {!auth ? (
                            <DefaultButton type={'action'} paddingRightLeft={16} paddingTopBottom={12} value={'Sign in'}
                                           func={() => openLogin()}/>) :
                            (<>
                                <div className={styles.profile_header}>
                                    <img src={pic} className={styles.profile_header_image} alt={'avatar'}/>

                                    <p className={styles.balance}>
                                        {balance}
                                    </p>
                                    <p className={styles.eth}>
                                        ETH
                                    </p>
                                </div>
                            </>)}
                    </div>
                    <div className={styles.icon_wrapper}>
                        <Icon name={'language'} width={20} height={20}/>
                    </div>
                </div>
                <button className={styles.mobileNavigation}>
                    <Icon name={'burger'} width={32} height={32}/>
                </button>
            </div>
        </header>
    );
}