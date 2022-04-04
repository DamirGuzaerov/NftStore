import React, {FC} from "react";
import NftCollectionPreviewCard from "../cards/nftCollectionPreviewCard/nftCollectionPreviewCard";
import styles from './nftCollectionsList.module.sass'
import {DefaultButton} from "../ui/buttons/default-button";
import {getCollectionsByChain} from "../../helpers/tokensHelper/tokensHelper";

const NFTCollectionsList = () => {
    const nftCollections = getCollectionsByChain('eth');

    return (
        <div className={styles.collectionsListWrapper}>
            <h1 className={styles.collectionsListFilter}>
                Top collections in <select className={styles.customSelect}>
                <option value="1 day">1 day</option>
                <option value="7 day">7 day</option>
                <option value="month">month</option>
            </select>
                <DefaultButton
                    value={"see all"}
                    paddingRightLeft={16}
                    paddingTopBottom={12}
                    func={() => console.log(1)}
                    type={'action'}/>
            </h1>
            <ul className={styles.collectionsList}>
                {nftCollections.slice(0,9).map((nftCollection,index)=>{
                    return(
                        <li key = {index}>
                            <NftCollectionPreviewCard
                                collectionAddress={nftCollection.address}
                                name={nftCollection.name}
                                previewImgUrl={nftCollection.image}
                            />
                         </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default NFTCollectionsList