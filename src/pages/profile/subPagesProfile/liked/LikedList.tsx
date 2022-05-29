import React, {useEffect, useState} from "react";
import Moralis from "moralis";
import {useAppSelector} from "../../../../utils/hooks/redux-hooks";
import {INFT} from "../../../../components/swipers/nftSwiper/NFTSwiper";
import {getNft} from "../../../../utils/hooks/getNfts";
import styles from "../SubPagesStyles.module.sass"
import {ShopCard} from "../../../../components/cards/shopCard/shopCard";
import {Oval} from "react-loader-spinner";

export const LikedList = () => {
    const [likedNfts, setLikedNfts] = useState<INFT[]>([]);
    const userSelector = useAppSelector(state => state.UserReducer);
    const like = Moralis.Object.extend("Likes");
    const query = new Moralis.Query(like);
    const [isLoading, setIsLoading] = useState(true);
    query.containedIn("UserAddress", [
        userSelector.wallet
    ]);

    useEffect(() => {
        const fetchLikes = async () => {
            return await query.find();
        }
        const promises: any[] = [];
        const nfts: INFT[] = [];
        fetchLikes().then((r) => {
            r.map(async (i) => {
                const val = i.attributes;
                promises.push(getNft(val.Address, val.Token).then(r => {
                    nfts.push(r);
                }));
            })
            Promise.all(promises).then(() => {
                setLikedNfts(nfts);
                setIsLoading(false)
            })
        })
    }, []);
    return (<>
            {isLoading && <div className={styles.loading}>
                <Oval color="#00BFFF" height={100} width={100}/>
            </div>}
            {!isLoading && <div className={styles.liked_container}>
                {likedNfts.map((e, counter) => {
                    return <ShopCard key={counter} creatorImgUrl={e.metadata.name} imgUrl={e.image} nftCost={'0'}
                                     nftName={e.metadata.name} address={e.token_address}
                                     token_id={e.token_id} amount={e.amount}/>
                })}
            </div>}
        </>

    )
}