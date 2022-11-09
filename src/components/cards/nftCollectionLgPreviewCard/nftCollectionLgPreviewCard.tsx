import React, {FC} from "react";
import creatorImgUrl from "../../../assets/images/tempImg/creatorImg.png";
import styles from "./nftCollectionLgPreviewCard.module.sass"
import {NftCollectionPreviewCardProps} from "../nftCollectionPreviewCard/nftCollectionPreviewCard";

export const NFTCollectionLgPreviewCard:FC<NftCollectionPreviewCardProps> = ({collectionAddress, previewImgUrl, name,description}) => {
    return (
            <div className={styles.previewCardWrapper}>
                <div className={styles.previewCardImgWrapper}>
                    <img className={styles.previewCardImg} src={previewImgUrl} alt=""/>
                </div>
                <div className={styles.previewCardInfoWrapper}>
                    <div className={styles.previewCardMainInfo}>
                        <div className={styles.collectionName}>{name}</div>
                        <div className={styles.collectionDesc}>{description}</div>
                    </div>
                    <div className={styles.previewCardSecInfo}>
                        Created by
                        <img className={styles.creatorAvatar} src={creatorImgUrl} alt=""/>
                    </div>
                </div>
            </div>
    )
}