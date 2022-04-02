import styles from './homepageStyles.module.sass';
import NFTSwiper from "../../components/swipers/nftSwiper/NFTSwiper";
import {MainNFTSwiper} from "../../components/swipers/mainNFTSwiper/mainNFTSwiper";
import NFtCollectionsList from "../../components/nftCollectionsList/nftCollectionsList";
import {getCollectionsByChain} from "../../helpers/tokensHelper/tokensHelper";
import {NFTCollectionLgPreviewCard} from "../../components/nftCollectionLgPreviewCard/nftCollectionLgPreviewCard";

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