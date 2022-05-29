import styles from "./tooManyRequests.module.sass"
import Icon from "../../../components/ui/icon/icon";
export const TooManyRequests = ()=>{
    return(<>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    429
                </h1>
                <div className={styles.icon}>
                    <Icon height={230} name={"sadFace"} width={230}/>
                </div>
            </div>
        </div>
    </>)
}