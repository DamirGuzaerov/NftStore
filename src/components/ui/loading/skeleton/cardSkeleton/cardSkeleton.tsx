import styles from './cardStyles.module.sass';

export const CardSkeleton = () => {
    return(
      <div className={`${styles.card_skeleton__wrapper}`}>
          <div className={`${styles.card_skeleton__avatar} ${styles.skeleton}`}>
          </div>
          <div className={`${styles.card_skeleton__content} ${styles.skeleton}`}>
          </div>
      </div>
    );
}