import styles from './discoverStyles.module.sass';
import Icon from "../../components/ui/icon/icon";
import {DropDown} from "../../components/dropdown/dropDown";
import {NavLink} from "react-router-dom";

export const DiscoverPage = () => {

    return (
        <div className={styles.discover_page_wrapper}>
            <div className={styles.discover_page}>
                <div className={`${styles.rowblock_discover} ${styles.first_line}`}>
                    <h2>
                        Type your keywords
                    </h2>

                    <button className={styles.searchButton}>
                        <Icon name={'white_search'} width={16} height={16}/>
                    </button>
                </div>

                <div className={`${styles.rowblock_discover}`}>
                    <div className={styles.filters}>
                        <DropDown>
                            <p>fdfd</p>
                        </DropDown>
                    </div>

                    <div className={styles.types_and_cards}>
                        <nav className={styles.nav_types}>
                            <NavLink to={{pathname: '/discover'}} className={({isActive}) => (isActive ? styles.types : styles.submited_type)}>
                                All items
                            </NavLink>

                            <NavLink className={({isActive}) => (isActive ? styles.types : styles.submited_type)} to={'/discover?video'}>
                                Video
                            </NavLink>

                            <NavLink className={({isActive}) => (isActive ? styles.types : styles.submited_type)} to={'/discover?anotherType'}>
                                EQ
                            </NavLink>

                            <NavLink className={({isActive}) => (isActive ? styles.types : styles.submited_type)} to={'/discover?other'}>
                                Fdff
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}