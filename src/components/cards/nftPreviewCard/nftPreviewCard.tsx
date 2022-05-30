import styles from "./nftPreviewCard.module.sass"
import {FC, useEffect} from "react";
import Icon from "../../ui/icon/icon";
import {NftCost} from "../../ui/nftCost/nftCost";
import {Link} from "react-router-dom";


export interface nftPreviewProps {
    address:string,
    token_id:string
    imgUrl: string,
    nftName: string,
    nftCost: string,
    creatorImgUrl: string,
    nftLikes: string,
}

const NftPreviewCard: FC<nftPreviewProps> = (props) => {
    const {
        address,
        token_id,
        imgUrl,
        nftName,
        nftCost,
        creatorImgUrl,
        nftLikes
    } = props;

    return (
        <div className={styles.previewCardWrapper}>
            <Link to={`/assets/${address.toLowerCase()}/${token_id}/info`}>
                <div className={styles.previewCardImgWrapper}>
                    <img className={styles.previewCardImg} src={imgUrl} alt=""/>
                    <div className={styles.hoverElements}>
                        <Link to={`/assets/${address.toLowerCase()}/${token_id}/info`}>
                            <button className={styles.buyNftButton}>View Item
                                <Icon width={20} height={20} name={'rhomb'}/>
                            </button>
                         </Link>
                    </div>
                </div>
            </Link>
            <div className={styles.previewCardInfoWrapper}>
                <div className={styles.previewCardMainInfo}>
                    <div className={styles.nftName}>{nftName}</div>
                    <NftCost cost={100} currency={"ETH"}/>
                </div>
                <div className={styles.previewCardSecInfo}>
                    <img className={styles.creatorAvatar} src={creatorImgUrl} alt=""/>
                    <div className={styles.nftLikes}>
                        <div className={styles.iconContainer}>
                            <Link className={styles.likeIcon} to={`/assets/${address.toLowerCase()}/${token_id}/info`}>
                                <Icon height={24} width={24} name={'like'}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NftPreviewCard;