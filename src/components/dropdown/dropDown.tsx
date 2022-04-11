import {useState} from "react";
import styles from './dropDownStyles.module.sass';
import Icon from "../ui/icon/icon";


export const DropDown = (props: {items: string[], name: string}) => {
    const [isOpened, setIsOpened] = useState(false);
    const {items} = props;
    const {name} = props;
    return (
        <>
            <div className={styles.dropDownContainer}>
                <p>
                    {name}
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
                        {items.map(item => {
                            return (
                                <li key={item} className={styles.drop_down_item}>
                                    <button className={styles.drop_down_item_button}>
                                        <p>
                                            {item}
                                        </p>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>) : null
                }
            </div>
        </>
    );
}