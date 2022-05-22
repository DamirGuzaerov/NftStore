import styles from './settingsTextInputStyles.module.sass';
import {FC} from "react";

interface props {
    setValue: Function,
    placeholder: string,
    globalPlaceholder: string,
    setFlag: Function
}

export const SettingsTextInput: FC<props> = ({setValue, placeholder, globalPlaceholder, setFlag}) => {

    const emailValidation = (e: any) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setFlag(true);
        } else {
            setFlag(false);
        }
    }

    const bioValidation = (e: any) => {
        if (e.target.value.length > 150) {
            setFlag(false)
        } else {
            setFlag(true)
        }
    }

    function detect() {
        switch (placeholder) {
            case 'Enter your email':
                return (<label className={styles.label_font}>
                    {globalPlaceholder}
                    <input placeholder={placeholder} type={'text'} className={styles.text_input}
                           onChange={e => setValue(e.target.value)} onKeyUp={(e) => emailValidation(e)}/>
                </label>)

            case 'Enter your bio':
                return (
                    <label className={styles.label_font}>
                        {globalPlaceholder}
                        <input placeholder={placeholder} type={'text'} className={styles.text_input}
                               onChange={e => setValue(e.target.value)} onKeyUp={(e) => bioValidation(e)}/>
                    </label>
                )
            default:
                return (<label className={styles.label_font}>
                    {globalPlaceholder}
                    <input placeholder={placeholder} type={'text'} className={styles.text_input}
                           onChange={e => setValue(e.target.value)}/>
                </label>)
        }
    }

    return (
        detect()
    )
}