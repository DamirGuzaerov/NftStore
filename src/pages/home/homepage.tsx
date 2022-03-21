import styles from './homepageStyles.module.sass';
import NFTSwiper from "../../components/swipers/nftSwiper/NFTSwiper";
import NftCollectionPreviewCard from "../../components/nftCollectionPreviewCard/nftCollectionPreviewCard";
import NftCollectionsList from "../../components/nftCollectionsList/nftCollectionsList";

export const Homepage = () => {
    return (
        <main>
            <div className={styles.main_container}>
                <h1>NFT of the day</h1>
                <NftCollectionsList/>
                <NFTSwiper/>
            </div>
        </main>
    );
}

