import styles from "./nft.module.sass"
import {Link, Outlet, useParams} from "react-router-dom";
import {getNft, getNFTOwners, getPrice} from "../../utils/hooks/getNfts";
import React, {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Oval} from "react-loader-spinner";
import {NftCost} from "../../components/ui/nftCost/nftCost";
import Icon from "../../components/ui/icon/icon";
import NftInfoSwitcher from "../../components/nftInfoSwitcher/nftInfoSwitcher";
import {useAppDispatch} from "../../utils/hooks/redux-hooks";
import {fetchOwners} from "../../stores/reducers/ActionCreators";
import {useMoralisQuery, useMoralisWeb3Api} from "react-moralis";
import {addBid} from "../../stores/reducers/bidSlice";

export const Nft = () => {
    const {address, token_id} = useParams();
    const [Nft, setNft] = useState<INFT>();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const {fetch} = useMoralisQuery(
        'Transaction',
        q => q.equalTo("address", '0xfbeef911dc5821886e1dda71586d90ed28174b7d'),
        [],
        {autoFetch: false}
    );

    const objectIdQuery = () => {
        fetch({
            onSuccess: (r) => {
                console.log(r);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };


    useEffect(() => {
        getNft(address!, token_id!)
            .then((r) => {
                setNft(r);
                const data = {
                    address: address,
                    token: token_id
                }
                dispatch(addBid(data))
                console.log(r);
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false))


        //@ts-ignore
        dispatch(fetchOwners({address, token_id}));
        objectIdQuery();

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
                        <span className={styles.currentPrice}>{Nft?.amount} in stock</span>
                    </div>
                    <NftInfoSwitcher/>
                </div>
            </div>
        </div>
    )
}