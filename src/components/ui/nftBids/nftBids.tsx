import styles from "./nftBidsStyles.module.sass";
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React, {useEffect, useState} from "react";
import Moralis from "moralis";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";

export interface IBid {
    user: string,
    price: string,
    createdAt: any
}

export const NftBids = () => {
    const selector = useAppSelector(state => state.BidReducer);
    const [transactions, setTransactions] = useState<IBid[]>([]);

    useEffect(() => {
        const transaction = Moralis.Object.extend("Transaction");
        const query = new Moralis.Query(transaction);
        query.containedIn("address", [
            selector.address
        ])
        query.containedIn("token", [
            selector.token
        ])
        const fetchTransaction = async () => {
            return await query.find();
        }

        fetchTransaction().then(r => {
            const list: IBid[] = [];
            r.forEach(i => {
                const val = i.attributes;
                list.push({
                    user: val.user,
                    price: val.price,
                    createdAt: val.createdAt
                })
            })
            setTransactions(list);
            console.log(transactions);
        })

    }, [])


    return (
        <div className={styles.owners}>
            {transactions.map((item, count) => {
                return (
                    <div key={count} className={styles.bid}>
                        <Avatar height={50} width={50} imgUrl={creator}/>
                        <div className={styles.bidInfo}>
                            <div className={styles.userInfo}>
                                User
                                <div className={styles.userName}>
                                    {item.user}
                                </div>
                            </div>
                            <div className={styles.userInfo}>
                                <p className={styles.subtitle}>
                                    Bid
                                </p>
                                <div className={styles.price}>
                                    {item.price} <span>ETH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
