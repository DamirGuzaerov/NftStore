import styles from './bidSkeletonStyles.module.sass';

export const BidSkeleton = () => {
    return(
        <div className={`${styles.bid_skeleton} ${styles.skeleton}`}>
        </div>
    )
}