import styles from './footerStyles.module.sass';

export const Footer = () => {
    return(
        <footer>
            <div className={styles.footer_container}>
                <p>
                    Copyright © 2022. All rights reserved
                </p>
            </div>
        </footer>
    )
}