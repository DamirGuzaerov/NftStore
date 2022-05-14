import {ModalTemplate} from "../modalConstructor/modalTemplate";
import styles from './placeBid.module.sass';
import {useEffect, useState} from "react";
import {getBalance} from "../../../utils/hooks/getNfts";
import {useAuth} from "../../../utils/hooks/useAuth";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {DefaultButton} from "../../ui/buttons/default-button";
import {useDispatch} from "react-redux";
import {removeModal} from "../../../stores/reducers/modalSlice";

export const PlaceBidModal = () => {
    const auth = useAuth();
    const [balance, setBalance] = useState();
    const selector = useAppSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(removeModal());
    }

    const [bid, setBid] = useState('');

    const getUserBalance = () => {
        if (auth) {
            getBalance(selector.wallet).then((r) => {
                setBalance(r);
            })
        }
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
                    <DefaultButton value={'Place a bid'} paddingRightLeft={60} type={'f'} paddingTopBottom={16} func={console.log}/>
                    <DefaultButton paddingRightLeft={60} value={'Cancel'} type={'action'} paddingTopBottom={16} func={closeModal}/>
            </div>

        </ModalTemplate>
    );
}