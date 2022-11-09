import styles from './buttonStyles.module.sass';

interface props {
    value: string,
    type: string
    paddingTopBottom: number | string,
    paddingRightLeft?: number | string,
    large?: boolean
    func: Function
}


export const DefaultButton = ({
                                  value,
                                  paddingRightLeft = "auto",
                                  large = false,
                                  paddingTopBottom,
                                  type,
                                  func
                              }: props) => {
    let buttonStyle;
    if (type != 'action') {
        buttonStyle = {
            border: 'none',
            backgroundColor: 'rgba(55, 114, 255, 1)',
            paddingTop: paddingTopBottom,
            paddingBottom: paddingTopBottom,
            paddingLeft: paddingRightLeft,
            paddingRight: paddingRightLeft,
            width: large ? "100%" : "auto",
        }
    } else {
        buttonStyle = {
            background: 'none',
            border: '2px solid #777E90',
            paddingTop: paddingTopBottom,
            paddingBottom: paddingTopBottom,
            paddingLeft: paddingRightLeft,
            paddingRight: paddingRightLeft,
            width: large ? "100%" : "auto",
        }
    }
    return (
        <button className={styles.default_button} style={buttonStyle} onClick={() => func()}>
            {value}
        </button>
    )
}