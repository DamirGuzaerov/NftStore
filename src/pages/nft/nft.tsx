import styles from "./nft.module.sass"
import {Link, Outlet, useParams} from "react-router-dom";
import {getNft, getOwner} from "../../utils/hooks/getNfts";
import React, {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Oval} from "react-loader-spinner";
import {NftCost} from "../../components/ui/nftCost/nftCost";
import Icon from "../../components/ui/icon/icon";
import NftInfoSwitcher from "../../components/nftInfoSwitcher/nftInfoSwitcher";

export const Nft = () => {
    const {address, token_id} = useParams();
    const [Nft, setNft] = useState<INFT>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getNft(address!, token_id!)
            .then((r) => {
                setNft(r);
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false))
        console.log(getOwner(address!, token_id!, 'eth').then((r) => {
            return r.data;
        }))
    }, [])
    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Oval color="#00BFFF" height={50} width={50}/>
            </div>
        )
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainCardWrapper}>
                <div className={styles.imageWrapper}>
                    <img src={Nft?.image} className={styles.cardImage}/>
                </div>
                <div className={styles.mainCardInfo}>
                    <div className={styles.topInfo}>
                        <h2 className={styles.name}>{Nft?.metadata.name}</h2>
                        <button className={styles.likeBtn}>
                            <Icon height={26} width={26} name={"like"}/>
                        </button>
                    </div>
                    <div className={styles.price}>
                        <NftCost cost={10} currency={"ETH"}/>
                        <span className={styles.currentPrice}>Current price</span>
                    </div>
                    <NftInfoSwitcher/>
                </div>
            </div>
        </div>
    )
}