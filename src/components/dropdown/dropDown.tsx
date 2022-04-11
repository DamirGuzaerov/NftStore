import {useState} from "react";
import styles from './dropDownStyles.module.sass';
import Icon from "../ui/icon/icon";


export const DropDown = ({children}: any) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <>
            <div className={styles.dropDownContainer}>
                <p>
                    fdfs
                </p>
                {!isOpened ?
                    (<button className={styles.button_drop_down} onClick={() => setIsOpened(!isOpened)}>
                        <Icon height={32} name={'dropdown_bottom'} width={32}/>
                    </button>) :
                    (<button className={styles.button_drop_down} onClick={() => setIsOpened(!isOpened)}>
                        <Icon height={32} name={'dropdown_bottom'} width={32}/>
                    </button>)
                }
                {isOpened ?
                    (<ul className={styles.drop_down}>
                        <li className={styles.drop_down_item}>
                            <button className={styles.drop_down_item_button}>
                                <p>
                                    fdsfsd
                                </p>
                            </button>
                        </li>

                        <li className={styles.drop_down_item}>
                            <button className={styles.drop_down_item_button}>
                                <p>
                                    fdsfsd
                                </p>
                            </button>
                        </li>
                        <li className={styles.drop_down_item}>
                            <button className={styles.drop_down_item_button}>
                                <p>
                                    fdsfsd
                                </p>
                            </button>
                        </li>
                        <li className={styles.drop_down_item}>
                            <button className={styles.drop_down_item_button}>
                                <p>
                                    fdsfsd
                                </p>
                            </button>
                        </li>
                    </ul>) : null
                }
            </div>
        </>
    );
}