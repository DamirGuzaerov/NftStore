import styles from './../SubPagesStyles.module.sass';
import React, {useEffect, useState} from "react";
import {INFT} from "../../../../components/swipers/nftSwiper/NFTSwiper";
import {useAppSelector} from "../../../../utils/hooks/redux-hooks";
import Moralis from "moralis";
import {getNft} from "../../../../utils/hooks/getNfts";
import {ShopCard} from "../../../../components/cards/shopCard/shopCard";
import {Oval} from "react-loader-spinner";

export const BitsList = () => {
    const [transactions, setTransactions] = useState<INFT[]>([]);
    const userSelector = useAppSelector(state => state.UserReducer);
    const transaction = Moralis.Object.extend("Transaction");
    const query = new Moralis.Query(transaction);
    const [isLoading,setIsLoading] = useState(true);
    query.containedIn("user", [
        userSelector.wallet
    ]);

    useEffect(() => {
        const fetchTransactions = async () => {
            return await query.find();
        }
        const promises: any[] = [];
        const nfts: INFT[] = [];
        fetchTransactions().then( (r) => {
            r.map( async (i) => {
                const val = i.attributes;
                promises.push(getNft(val.address, val.token).then(r => {
                    nfts.push(r);
                }));
            })
            Promise.all(promises).then(() => {
                setTransactions(nfts);
                setIsLoading(false);
            })
        })
    }, []);


    return(<>
            {isLoading && <div className={styles.loading}>
                <Oval color="#00BFFF" height={100} width={100}/>
            </div>}
        {!isLoading&&<div className={styles.liked_container}>
                {transactions.map((e, counter) => {
                    return <ShopCard key={counter} creatorImgUrl={e.name} imgUrl={e.image} nftCost={'0'}
                                     nftName={e.metadata.name} address={e.token_address}
                                     token_id={e.token_id} amount={e.amount}/>
                })}
            </div>}
    </>
    )
};