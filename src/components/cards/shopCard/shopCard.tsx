import styles from './shopCardStyles.module.sass';
import Icon from "../../ui/icon/icon";
import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import defaulImg from "../../../assets/images/tempImg/nftPreviewImg.png"
import Moralis from "moralis";
import img from "./../../../assets/images/tempImg/creator.png";

interface shopCardProps {
    imgUrl: string,
    nftName: string,
    nftCost: string | number,
    creatorImgUrl: string,
    address: string,
    token_id: string,
    amount: string
}

export const ShopCard: FC<shopCardProps> = ({imgUrl, nftName, nftCost, creatorImgUrl, address, token_id, amount}) => {
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
            if(r) {
                setHighestBid(val?.price);
            } else {
                setHighestBid("0");
            }
        })

    }, [])

    const urlCheck = () => {
        if (imgUrl.includes('mp4') || imgUrl.includes('webm')) {
            return (
                <video className={styles.nft_image}>
                    <source src={imgUrl}/>
                </video>
            )
        } else {
            return (
                <img src={imgUrl} onError={({currentTarget}) => {
                    currentTarget.src = defaulImg;
                    currentTarget.onerror = null;
                }} className={styles.nft_image}/>
            )
        }
    }

    return (
        <div className={styles.shopcard_container}>
            <Link to={`/assets/${address}/${token_id}/info`}>
                {urlCheck()}
            </Link>
            <div className={styles.nft_content}>
                <div className={styles.nft_content_row}>
                    <p>
                        {nftName}
                    </p>

                    <div className={styles.nft_price}>
                        <p>
                            {nftCost} ETH
                        </p>
                    </div>
                </div>

                <div className={styles.nft_content_row}>
                    <img className={styles.creatorAvatar} src={img} alt=""/>
                    <p>
                        {amount} in stock
                    </p>
                </div>

                <div className={styles.nft_content_row}>
                    <span className={styles.bet}>
                        <Icon name={'nftbet'} width={20} height={20}/>
                        <p className={styles.highest_bet}>
                            Highest bid
                        </p>
                        <p className={styles.bet_price}>
                            {highestBid} ETH
                        </p>
                    </span>
                </div>
            </div>
        </div>
    );
}