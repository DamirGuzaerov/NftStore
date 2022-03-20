import styles from './buttonStyles.module.sass';
interface props {
    value: string,
    type: string
    paddingTopBottom: number,
    paddingRightLeft: number,
    func: Function
}

export const DefaultButton = ({value, paddingRightLeft, paddingTopBottom, type, func}: props) => {
    let buttonStyle;
    console.log(typeof func);
    if (type != 'action') {
        buttonStyle = {
            border: 'none',
            backgroundColor: 'rgba(55, 114, 255, 1)',
            paddingTop: paddingTopBottom,
            paddingBottom: paddingTopBottom,
            paddingLeft: paddingRightLeft,
            paddingRight: paddingRightLeft,
        }
    } else {
        buttonStyle = {
            background: 'none',
            border: '2px solid #777E90',
            paddingTop: paddingTopBottom,
            paddingBottom: paddingTopBottom,
            paddingLeft: paddingRightLeft,
            paddingRight: paddingRightLeft
        }
    }
    return(
        <button className={styles.default_button} style={buttonStyle} onClick={func()}>
            {value}
        </button>
    )
}