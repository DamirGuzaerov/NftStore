import styles from './buttonStyles.module.sass';
interface props {
    value: string,
    paddingTopBottom: number,
    paddingRightLeft: number
}

export const ActionButton = ({value, paddingRightLeft, paddingTopBottom}: props) => {
    return(
        <button className={styles.button_action} style={{paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom,
            paddingLeft: paddingRightLeft, paddingRight: paddingRightLeft}}>
            {value}
        </button>
    )
}