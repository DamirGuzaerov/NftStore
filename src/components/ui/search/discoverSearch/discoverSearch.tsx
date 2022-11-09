import React, {useEffect, useState} from "react";
import styles from "../search.module.sass";
import Icon from "../../icon/icon";

export const DiscoverSearch = (props: {setProp: Function}) => {
    const [value, setValue] = useState('');
    const [isSubmit,setIsSubmit] = useState(false);
    const setAttr = props.setProp;
    useEffect(() => {
        if(isSubmit){
            setAttr('search', value);
            setIsSubmit(false)
        }
    }, [isSubmit])
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsSubmit(true)
        }
    }
    return(
        <div className={styles.search_input_wrapper}>
            <input className={styles.search_discover} placeholder={'Search'} onKeyDown={(event)=>handleKeyDown(event)} onChange={(e) => setValue(e.target.value)}/>
            <div className={styles.search_icon}>
                <Icon name={'search'} height={26} width={26}/>
            </div>
        </div>
    );
}