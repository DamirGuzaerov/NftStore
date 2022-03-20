import Icon from "../ui/icon/icon";
import styles from'./header.module.sass';
import logo from './../../assets/logo.svg'
import {Link} from "react-router-dom";
import {Search} from "../ui/search/search";
import {DefaultButton} from "../ui/buttons/default-button";
import {addModal, modalSlice} from "../../stores/reducers/modalSlice";
import {LoginModal} from "../modals/loginModal/loginModal";
import {useDispatch} from "react-redux";
import {Modal} from "../../stores/reducers/modalSlice";

export const Header = () => {
    const dispatch = useDispatch();

    const openLogin = () => {
        console.log('opened');
        const modal: Modal = {currentModal: LoginModal};
        dispatch(addModal(modal));
    }


    return(
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
                <Search/>
                <div className={styles.buttons_container}>
                    <DefaultButton type={'submit'}  paddingRightLeft={16} paddingTopBottom={12} value={'Upload'} func={console.log}/>
                    <DefaultButton type={'action'} paddingRightLeft={16} paddingTopBottom={12} value={'Sign in'} func={console.log}/>
                </div>
                <Icon name={'language'} width={20} height={20}/>
            </div>
        </header>
    );
}