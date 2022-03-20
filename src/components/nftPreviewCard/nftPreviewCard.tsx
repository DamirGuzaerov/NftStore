import styles from "./nftPreviewCard.module.sass"
import {FC, useEffect} from "react";
import Icon from "../ui/icon/icon";
interface nftPreviewProps{
    imgUrl:string,
    nftName:string,
    nftCost:string,
    creatorImgUrl:string,
    nftLikes:string
}

const NftPreviewCard: FC<nftPreviewProps> = (props) => {
    const {
        imgUrl,
        nftName,
        nftCost,
        creatorImgUrl,
        nftLikes
    } = props;

    return(
        <div className={styles.previewCardWrapper}>
            <div className={styles.previewCardImgWrapper} >
                <img className={styles.previewCardImg} src={imgUrl} alt=""/>
                <div className={styles.hoverElements}>
                    <button className={styles.buyNftButton}>Buy Now
                        <Icon width={20} height={20} name={'rhomb'}></Icon></button>
                </div>
            </div>
            <div className={styles.previewCardInfoWrapper}>
                <div className={styles.previewCardMainInfo}>
                    <div className={styles.nftName}>{nftName}</div>
                    <div className={styles.nftCost}>{nftCost}</div>
                </div>
                <div className={styles.previewCardSecInfo}>
                    <img className={styles.creatorAvatar} src={creatorImgUrl} alt=""/>
                    <div className={styles.nftLikes}>
                        <div className={styles.iconContainer}>
                            <Icon height={24} width={24} name={'like'}/>
                        </div>
                        {nftLikes}
                    </div>
                </div>
            </div>
        </div>
        )
}

export default NftPreviewCard;