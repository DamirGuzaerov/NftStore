import styles from './textInputStyles.module.sass';
import {FC} from "react";

interface props {
    setValue: Function,
    placeholder: string,
    globalPlaceholder: string,
}

export const TextInput: FC<props> = ({setValue, placeholder, globalPlaceholder }) => {
    return (
        <label className={styles.label_font}>
            {globalPlaceholder}
            <input placeholder={placeholder} type={'text'} className={styles.text_input}
                   onChange={e => setValue(e.target.value)}/>
        </label>
    );
}