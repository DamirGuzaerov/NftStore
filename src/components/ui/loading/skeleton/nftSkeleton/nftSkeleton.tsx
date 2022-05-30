import styles from './nftSkeleton.module.sass';

export const NftSkeleton = () => {
    return(
        <div className={styles.card__wrapper}>
            <div className={`${styles.card__image} ${styles.skeleton}`}>
            </div>
            <div className={`${styles.card__decription} ${styles.skeleton}`}>
            </div>
        </div>
    )
}