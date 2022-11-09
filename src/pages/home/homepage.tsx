import styles from './homepageStyles.module.sass';
import {MainNFTSwiper} from "../../components/swipers/mainNFTSwiper/mainNFTSwiper";
import NFtCollectionsList from "../../components/nftCollectionsList/nftCollectionsList";
import NFTSwiper from "../../components/swipers/nftSwiper/NFTSwiper";

export const Homepage = () => {
    return (
        <main>
            <div className={styles.main_container}>
                <h1>NFT of the day</h1>
                    <MainNFTSwiper/>
                    <NFTSwiper/>
                    <NFtCollectionsList/>
            </div>
        </main>
    );
}