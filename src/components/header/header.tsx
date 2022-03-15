import Icon from "../../utils/icon/icon";
import styles from'./header.module.sass';
import logo from './../../assets/logo.svg'
import {Link} from "react-router-dom";
import {Search} from "../search/search";
import {SubmitButton} from "../ui/buttons/submit-button";
import {ActionButton} from "../ui/buttons/action-button";

export const Header = () => {
    return(
        <header>
            <div className={styles.header_wrapper}>
                <div className={styles.header__left_content}>
                    <div className={styles.logo}>
                        <object data={logo} type=""/>
                        <p className={styles.logo_name}>NFT-Store</p>
                    </div>
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
                    <SubmitButton  paddingRightLeft={16} paddingTopBottom={12} value={'Upload'}/>
                    <ActionButton paddingRightLeft={16} paddingTopBottom={12} value={'Sign in'}/>
                </div>
                <Icon name={'language'} width={20} height={20}/>
            </div>
        </header>
    );
}