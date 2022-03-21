import React, {FC} from "react";
import imgUrl from "../../assets/images/tempImg/tempPreviewImgCollection.svg";
import NftCollectionPreviewCard from "../nftCollectionPreviewCard/nftCollectionPreviewCard";
import styles from './nftCollectionsList.module.sass'
import {DefaultButton} from "../ui/buttons/default-button";

const NFtCollectionsList = () => {

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
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
                <li>
                    <NftCollectionPreviewCard
                        collectionAddress={'0xED5AF388653567Af2F388E6224dC7C4b3241C544'}
                        name={'Azuki'}
                    />
                </li>
            </ul>
        </div>
    )
}

export default NFtCollectionsList