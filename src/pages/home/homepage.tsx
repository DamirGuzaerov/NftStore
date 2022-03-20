import styles from './homepageStyles.module.sass';
import NftPreviewCard from "../../components/nftPreviewCard/nftPreviewCard";

import nftImg from '../../assets/images/tempImg/nftPreviewImg.png'
import authorImg from '../../assets/images/tempImg/creatorImg.png'


export const Homepage = () => {
    return(
      <main>
          <div className={styles.main_container}>
              <h1>NFT of the day</h1>
              <NftPreviewCard
                  imgUrl={nftImg}
                  creatorImgUrl={authorImg}
                  nftCost={'1000 ETH'}
                  nftName={'Amazing NFT'}
                  nftLikes={'245'}
              />
          </div>
      </main>
    );
}