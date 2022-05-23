import {ModalTemplate} from "../modalConstructor/modalTemplate";
import styles from './placeBid.module.sass';
import {useEffect, useState} from "react";
import {getBalance} from "../../../utils/hooks/getNfts";
import {useAuth} from "../../../utils/hooks/useAuth";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {DefaultButton} from "../../ui/buttons/default-button";
import {useDispatch} from "react-redux";
import {removeModal} from "../../../stores/reducers/modalSlice";
import {useNewMoralisObject} from "react-moralis";
import {useParams} from "react-router-dom";
import {ToastProperties} from "../../ui/toaster/Toast";
import Moralis from "moralis";

export const PlaceBidModal = () => {
    const auth = useAuth();
    const [balance, setBalance] = useState();
    const selector = useAppSelector(state => state.UserReducer);
    const bidSelector = useAppSelector(state => state.BidReducer);
    const dispatch = useDispatch();
    const {save} = useNewMoralisObject("Transaction");
    const [list, setList] = useState<ToastProperties[]>([]);
    const Transaction = Moralis.Object.extend("Transaction");
    const query = new Moralis.Query(Transaction);
    query.containedIn("user", [
        selector.wallet
    ]);

    query.containedIn("address", [
        bidSelector.address
    ]);

    query.containedIn("token", [
        bidSelector.token
    ]);

    let toastProperties = null;

    const closeModal = () => {
        dispatch(removeModal());
    }

    const showToast = (type: string) => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: 1,
                    title: 'Success!',
                    description: 'Your bid is accepted!',
                    backgroundColor: '#5cb85c'
                }
                break;
            case 'fail':
                toastProperties = {
                    id: 2,
                    title: 'Failed!',
                    description: 'Something went wrong...',
                    backgroundColor: '#d9534f'
                }
                break;
            default:
                toastProperties = [];
        }

        // @ts-ignore
        setList([toastProperties]);
    }


    const [bid, setBid] = useState('');

    const getUserBalance = () => {
        if (auth) {
            getBalance(selector.wallet).then((r) => {
                setBalance(r);
            })
        }
    }

    const makeBid = async () => {

        query.first().then(async (r) => {
            if (r) {
                console.log('saved');
                const queryResult = await query.first();
                // @ts-ignore
                queryResult.set("price", parseFloat(bid));
                // @ts-ignore
                queryResult.save().then(() => {
                    closeModal();
                    showToast('success');
                }).catch(() => {
                    closeModal();
                    showToast('fail');
                })

            } else {
                const data = {
                    token: bidSelector.token,
                    address: bidSelector.address,
                    price: parseFloat(bid),
                    user: selector.wallet
                }
                await save(data, {
                    onSuccess: (item) => {
                        closeModal();
                        showToast('success');
                    },
                    onError: (item) => {
                        closeModal();
                        showToast('fail');
                    }
                })
            }
        })

    }


    useEffect(() => {
        getUserBalance();
    }, [])

    useEffect(() => {
        getUserBalance();
    }, [selector])


    return (
        <ModalTemplate title={"Place a bid"}>
            <p className={styles.subtitle_modal}>
                You are going to place a bid for this NFT
            </p>
            <div className={styles.bid_container}>
                <h2>
                    Your bid
                </h2>
                <span className={styles.bid_line}>
                    <input type={"number"} onChange={(e) => setBid(e.target.value.toString())}
                           placeholder={'Enter Bid'}/>
                    <p>ETH</p>
                </span>
                <span className={styles.bid_line}>
                    <p className={styles.p_description}>
                        Service fee
                    </p>

                    <p>
                        {balance !== undefined && !isNaN(parseInt(bid)) ? parseInt(bid) * 0.00001 : 0} ETH
                    </p>
                </span>
                <span className={styles.bid_line}>
                    <p className={styles.p_description}>
                        Your balance
                    </p>

                    <p>
                        {balance} ETH
                    </p>
                </span>
                <span className={styles.bid_line}>
                    <p className={styles.p_description}>
                        Your balance
                    </p>

                    <p>
                        {balance} ETH
                    </p>
                </span>
                <div className={styles.button_wrapper}>
                    <DefaultButton value={'Place a bid'} paddingRightLeft={60} type={'f'} paddingTopBottom={16}
                                   func={makeBid}/>
                    <DefaultButton paddingRightLeft={60} value={'Cancel'} type={'action'} paddingTopBottom={16}
                                   func={closeModal}/>
                </div>
            </div>

        </ModalTemplate>
    );
}