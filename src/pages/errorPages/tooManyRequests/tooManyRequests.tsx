import styles from "./tooManyRequests.module.sass"
import Icon from "../../../components/ui/icon/icon";
export const TooManyRequests = ()=>{
    return(<>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <Icon height={150} name={"sadFace"} width={150}/>
                </div>
                <h1 className={styles.title}>
                    429
                </h1>
                <h2 className={styles.description}>
                    <p>
                        Too many requests.
                    </p>
                    <p>
                        Try to reduce the number of requests per second.
                    </p>
                </h2>
            </div>
        </div>
    </>)
}