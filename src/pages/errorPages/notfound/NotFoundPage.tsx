import styles from "../tooManyRequests/tooManyRequests.module.sass";
import Icon from "../../../components/ui/icon/icon";

export const NotFoundPage = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.icon}>
                        <Icon height={150} name={"sadFace"} width={150}/>
                    </div>
                    <h1 className={styles.title}>
                        404
                    </h1>
                    <h2 className={styles.description}>
                        <p>
                            Not Found
                        </p>
                        <p>
                            The requested resource was not found.
                        </p>
                    </h2>
                </div>
            </div>
        </>
    )
}