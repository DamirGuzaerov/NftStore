import styles from "../home/homepageStyles.module.sass";
import collectionStyles from "./collections.module.sass";
import {getCollectionsByChain} from "../../helpers/tokensHelper/tokensHelper";
import {NFTCollectionLgPreviewCard} from "../../components/cards/nftCollectionLgPreviewCard/nftCollectionLgPreviewCard";
import {Link} from "react-router-dom";

const Collections = () => {
    return (
        <main>
            <div className={styles.main_container}>
                <h1 className={collectionStyles.title}>
                    Explore Collections
                </h1>
                <div className={collectionStyles.collectionsGrid}>
                    {getCollectionsByChain("eth").map((collection, index) => {
                        return (
                            <Link to={`${collection.name.replaceAll(' ', '_')}`}>
                                <NFTCollectionLgPreviewCard
                                    key={index}
                                    collectionAddress={collection.address}
                                    name={collection.name}
                                    previewImgUrl={collection.image}
                                    description={collection.description}
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}

export default Collections;