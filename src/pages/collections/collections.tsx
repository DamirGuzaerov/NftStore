import styles from "../home/homepageStyles.module.sass";
import collectionStyles from "./collections.module.sass";
import {getCollectionsByChain} from "../../helpers/tokensHelper/tokensHelper";
import {NFTCollectionLgPreviewCard} from "../../components/nftCollectionLgPreviewCard/nftCollectionLgPreviewCard";
import { Outlet } from "react-router-dom";

const Collections= ()=>{
    return(
        <main>
            <div className={styles.main_container}>
                <h1 className={collectionStyles.title}>
                    Explore Collections
                </h1>
                <div className={collectionStyles.collectionsGrid}>
                    {getCollectionsByChain("eth").map((collection,index)=>{
                        return(
                            <NFTCollectionLgPreviewCard
                                key={index}
                                collectionAddress={collection.address}
                                name={collection.name}
                                previewImgUrl={collection.image}
                                description={collection.description}
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    );
}

export default Collections;