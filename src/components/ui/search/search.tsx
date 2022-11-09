import styles from './search.module.sass'
import {useState} from "react";
import Icon from "../icon/icon";

export const Search = () => {
    const [value, setValue] = useState('');
    console.log(value)
    return(
        <div className={styles.search_input_wrapper}>
            <input className={styles.search_input} placeholder={'Search'} onChange={(e) => setValue(e.target.value)}/>
            <div className={styles.search_icon}>
                <Icon name={'search'} height={20} width={20}/>
            </div>
        </div>
    );
}