import styles from "./nft.module.sass"
import {Link, Outlet, useParams} from "react-router-dom";
import {getNft, getNFTOwners, getPrice} from "../../utils/hooks/getNfts";
import React, {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Oval} from "react-loader-spinner";
import {NftCost} from "../../components/ui/nftCost/nftCost";
import Icon from "../../components/ui/icon/icon";
import NftInfoSwitcher from "../../components/nftInfoSwitcher/nftInfoSwitcher";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {fetchOwners} from "../../stores/reducers/ActionCreators";
import {useMoralisQuery, useMoralisWeb3Api, useNewMoralisObject} from "react-moralis";
import {addBid} from "../../stores/reducers/bidSlice";
import Moralis from "moralis";

export const Nft = () => {
    const {address, token_id} = useParams();
    const [Nft, setNft] = useState<INFT>();
    const selector = useAppSelector(state => state.UserReducer);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const {save} = useNewMoralisObject("Likes");
    const {fetch} = useMoralisQuery(
        'Transaction',
        q => q.equalTo("address", '0xfbeef911dc5821886e1dda71586d90ed28174b7d'),
        [],
        {autoFetch: false}
    );

    const subscribeToNft = async () => {
        const like = Moralis.Object.extend("Likes");
        const query = new Moralis.Query(like);

        query.containedIn("UserAddress", [
            selector.wallet
        ])
        query.containedIn("Address", [
            address
        ])
        query.containedIn("Token", [
            token_id
        ])

        await query.first().then(async (r) => {
            console.log(r);
            if (r === undefined) {
                const data = {
                    Token: token_id,
                    Address: address,
                    UserAddress: selector.wallet
                }
                await save(data, {
                    onSuccess: (r) => {
                        console.log(r);
                    },
                    onError: (e) => {
                        console.log(e);
                    }
                })
            } else {
                r.destroy().then(() => {
                    console.log('deleted');
                })
            }
        }).catch((e) => {
            console.log(e);
        })


    }

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
                        <button className={styles.likeBtn} onClick={subscribeToNft}>
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