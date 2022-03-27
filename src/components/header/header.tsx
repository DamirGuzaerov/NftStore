import Icon from "../ui/icon/icon";
import styles from './header.module.sass';
import logo from './../../assets/logo.svg'
import {Link} from "react-router-dom";
import {Search} from "../ui/search/search";
import {DefaultButton} from "../ui/buttons/default-button";
import {addModal, removeModal} from "../../stores/reducers/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../stores/reducers/ActionCreators";


export const Header = () => {
    const dispatch = useDispatch();

    const openLogin = () => {
        dispatch(addModal('Login'));
        console.log('opened')
    }

    const login = async () => {
        dispatch(fetchUser());
    }

    const closeLogin = () => {
        dispatch(removeModal());
    }

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
                        <Link to={'/collections'}>
                            NFT Collections
                        </Link>
                        <Link to={'/'}>
                            How it works
                        </Link>
                    </nav>
                </div>
                <Search/>
                <div className={styles.buttons_container}>
                    <DefaultButton type={'submit'} paddingRightLeft={16} paddingTopBottom={12} value={'Upload'}
                                   func={() => closeLogin}/>
                    <DefaultButton type={'action'} paddingRightLeft={16} paddingTopBottom={12} value={'Sign in'}
                                   func={() => openLogin()}/>
                </div>
                <Icon name={'language'} width={20} height={20}/>
            </div>
        </header>
    );
}