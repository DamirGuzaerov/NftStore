import styles from './MainSwiper.module.sass';
import author from './../../../assets/images/tempImg/creatorImg.png';
import {Link} from "react-router-dom";
import {nftPreviewProps} from "../../cards/nftPreviewCard/nftPreviewCard";
import {FC, useEffect, useState} from "react";
import Moralis from "moralis";

export const MainNFTSlide: FC<nftPreviewProps> = (
    {
        address,
        token_id,
        imgUrl,
        nftName,
        nftCost,
        creatorImgUrl
    }) => {
    const [highestBid, setHighestBid] = useState("");

    useEffect(() => {
        const transaction = Moralis.Object.extend("Transaction");
        const query = new Moralis.Query(transaction);
        query.containedIn("address", [
            address
        ])
        query.containedIn("token", [
            token_id
        ])
        query.descending("price");
        const fetchTransaction = async () => {
            return await query.first();
        }

        fetchTransaction().then(r => {
            const val = r?.attributes;
            if (r) {
                setHighestBid(val?.price);
            } else {
                setHighestBid("0");
            }
        })

    }, [])

    return (
        <div className={styles.mainSwiperContainer}>
            <img src={imgUrl} className={styles.image_settings} alt={imgUrl}/>

            <div className={styles.mainSlideContent}>
                <h1 className={styles.title_nft}>{nftName}</h1>
                <div className={styles.creator_container}>
                    <div className={styles.authorInfo}>
                        <div className={styles.author_avatar_wrapper}>
                            <img src={author} className={styles.author_avatar}/>
                        </div>
                        <div className={styles.author_name}>
                            <p>Creator</p>
                            <Link to={'/'}>{creatorImgUrl}</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.price_container}>
                    <h3>
                        Current best bid
                    </h3>
                    <h2>
                        {highestBid} ETH
                    </h2>
                </div>
                <Link to={`/assets/${address.toLowerCase()}/${token_id}/info`}>
                    <button className={styles.view_button}>
                        View item
                    </button>
                </Link>
            </div>
        </div>
    );
}