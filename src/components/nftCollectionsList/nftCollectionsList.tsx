import React, {FC} from "react";
import NftCollectionPreviewCard from "../cards/nftCollectionPreviewCard/nftCollectionPreviewCard";
import styles from './nftCollectionsList.module.sass'
import {DefaultButton} from "../ui/buttons/default-button";
import {getCollectionsByChain} from "../../helpers/tokensHelper/tokensHelper";
import {useNavigate} from "react-router-dom";

const NFTCollectionsList = () => {
    const nftCollections = getCollectionsByChain('eth');
    let navigate = useNavigate();

    function toNavigate() {
        return navigate("/collections");
    }

    return (
        <div className={styles.collectionsListWrapper}>
            <h1 className={styles.collectionsListFilter}>
                <span className={styles.collectionsListFilterTitle}>Top collections</span>
                <DefaultButton
                    value={"see all"}
                    paddingRightLeft={16}
                    paddingTopBottom={12}
                    func={() => toNavigate()}
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