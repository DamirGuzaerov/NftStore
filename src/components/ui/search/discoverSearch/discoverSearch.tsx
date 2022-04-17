import {useEffect, useState} from "react";
import styles from "../search.module.sass";
import Icon from "../../icon/icon";

export const DiscoverSearch = (props: {setProp: Function}) => {
    const [value, setValue] = useState('');
    const setAttr = props.setProp;
    useEffect(() => {
       setAttr('search', value);
    }, [value])
    return(
        <div className={styles.search_input_wrapper}>
            <input className={styles.search_discover} placeholder={'Search'} onChange={(e) => setValue(e.target.value)}/>
            <div className={styles.search_icon}>
                <Icon name={'search'} height={26} width={26}/>
            </div>
        </div>
    );
}