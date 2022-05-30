import styles from "./nftBidCard.module.sass"
import {Avatar} from "../avatar/avatar";
import user from "../../../assets/images/tempImg/creator.png";
import {DefaultButton} from "../buttons/default-button";
import {addModal} from "../../../stores/reducers/modalSlice";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/redux-hooks";
import {useEffect, useState} from "react";
import Moralis from "moralis";
import {IBid} from "../nftBids/nftBids";
import {Toast, ToastProperties} from "../toaster/Toast";
import {useAuth} from "../../../utils/hooks/useAuth";
import {getEthPrice} from "../../../utils/hooks/getNfts";
import {pipeString} from "../../../utils/services/stringServices/shortenString";

export const NftBidCard = () => {

    const dispatch = useAppDispatch();
    const [bid, setBid] = useState<IBid>();
    const [list, setList] = useState<ToastProperties[]>([]);
    const auth = useAuth();
    const selector = useAppSelector(state => state.BidReducer)
    const [ethPrice, setEthPrice] = useState(0);
    const openModal = (modal: string) => {
        dispatch(addModal(modal));
    }

    useEffect(() => {
        const transaction = Moralis.Object.extend("Transaction");
        const query = new Moralis.Query(transaction);
        query.containedIn("address", [
            selector.address
        ])
        query.containedIn("token", [
            selector.token
        ])
        query.descending("price");
        const fetchTransaction = async () => {
            return await query.first();
        }

        fetchTransaction().then(r => {
            const val = r?.attributes;
            setBid({
                price: val?.price,
                user: val?.user,
                createdAt: val?.createdAt
            })
        })

        getEthPrice().then(r => {
            setEthPrice(r?.data.USD);
        }).catch(e => {
            setEthPrice(1800);
        })

    }, [])

    return (
        <>
            <div className={styles.bidCardWrapper}>
                <div className={styles.bidCard}>
                    {bid?.user !== undefined ? (
                        <>
                            <div className={styles.highestBidUser}>
                                <Avatar width={50} height={50} imgUrl={user}/>
                                <div className={styles.highestBidInfo}>
                                    <p className={styles.bid_eth}>
                                        <span>Highest bid by</span>
                                        <span className={styles.userName}>
                                        {pipeString(bid?.user)}</span>
                                    </p>
                                    <p className={styles.bid}>
                                        <span>{bid?.price} ETH </span>
                                        <span className={styles.bidDollars}>
                        ${parseInt(bid?.price) * ethPrice}
                        </span>
                                    </p>
                                </div>
                            </div>
                        </>) : <h2>Nobody made a bid</h2>
                    }

                    {auth ? (<div className={styles.purchaseButtons}>
                        <div className={styles.btnWrapper}>
                            <DefaultButton
                                func={() => alert("Пока не реализовано")}
                                paddingTopBottom={16}
                                type={"default"}
                                value={"Purchase now"}
                                large={true}/>
                        </div>
                        <div className={styles.btnWrapper}>
                            <DefaultButton
                                func={() => openModal('PlaceBid')}
                                paddingTopBottom={16}
                                type={"action"}
                                value={"Place a bid"}
                                large={true}/>
                        </div>
                    </div>) : null
                    }

                    {bid?.user !== undefined ? (
                        <div className={styles.serviceFeeInfo}>
                        <span className={styles.serviceFeeInfoText}>
                        service fee:
                        </span>
                            <span className={styles.percent}>1.5%</span>
                            <span className={styles.serviceFeeInfoText}>
                                1 ETH
                            </span>
                            <span className={styles.serviceFeeInfoText}>
                        ${ethPrice}
                        </span>
                        </div>) : null
                    }

                </div>
            </div>
            <Toast list={list} position={'bottom_right'} setList={setList}/>
        </>
    )
}