import styles from './homepageStyles.module.sass';

export const Homepage = () => {
    return(
      <main>
          <div className={styles.main_container}>
              <h1>NFT of the day</h1>
          </div>
      </main>
    );
}