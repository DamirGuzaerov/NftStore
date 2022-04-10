import {FC} from "react";
import styles from './dropDownStyles.module.sass';
import Icon from "../ui/icon/icon";


interface dropDownProps {
    name: string,
    items: string[]
}

export const DropDown:FC<dropDownProps> = ({name, items}) => {
    return(
      <div className={styles.dropDownContainer}>
          <p>
              {name}
          </p>

          <button className={styles.button_drop_down}>
            <Icon  height={32} name={'dropdown_bottom'} width={32}/>
          </button>
      </div>
    );
}