import React, {FC, useEffect, useState} from "react";
import styles from "./nftCollectionPreviewCard.module.sass"

export interface NftCollectionPreviewCardProps {
    collectionAddress:string,
    previewImgUrl:string,
    name:string,
    totalPrice?:string,
    description?:string
}

const NFtCollectionPreviewCard:FC<NftCollectionPreviewCardProps> = (props) => {
    const {
        collectionAddress,
        previewImgUrl,
        name
    }=props

    return (
        <div className={styles.cardWrapper}>
            <img className={styles.cardPreviewImg} src={previewImgUrl}></img>
            <div className={styles.collectionInfo}>
                <div className={styles.collectionName}>{name}</div>
                <div className={styles.collectionPrice}>17,315,885$</div>
            </div>
        </div>
    )
}



export default NFtCollectionPreviewCard