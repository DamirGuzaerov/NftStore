import styles from './homepageStyles.module.sass';
import NFTSwiper from "../../components/swipers/nftSwiper/NFTSwiper";

export const Homepage = () => {
    return(
      <main>
          <div className={styles.main_container}>
              <h1>NFT of the day</h1>
                <NFTSwiper/>
          </div>
      </main>
    );
}