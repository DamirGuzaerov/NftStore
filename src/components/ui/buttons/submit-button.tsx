import styles from './buttonStyles.module.sass'
interface props {
    value: string,
    paddingTopBottom: number,
    paddingRightLeft: number
}
export const SubmitButton = ({value, paddingTopBottom, paddingRightLeft}: props) => {
    return(
      <button className={styles.button_submit} style={{paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom,
          paddingLeft: paddingRightLeft, paddingRight: paddingRightLeft}}>
          {value}
      </button>
    );
}