import styles from "./nft.module.sass"
import {Link, Outlet, useParams} from "react-router-dom";
import {getNft} from "../../utils/hooks/getNfts";
import React, {useEffect, useRef, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Oval} from "react-loader-spinner";
import {NftCost} from "../../components/ui/nftCost/nftCost";
import Icon from "../../components/ui/icon/icon";
import NftInfoSwitcher from "../../components/nftInfoSwitcher/nftInfoSwitcher";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {fetchOwners} from "../../stores/reducers/ActionCreators";
import {useNewMoralisObject} from "react-moralis";
import {addBid} from "../../stores/reducers/bidSlice";
import Moralis from "moralis";
import {useAuth} from "../../utils/hooks/useAuth";
import img from './../../assets/images/tempImg/nftPreviewImg.png';
import {Toast, ToastProperties} from "../../components/ui/toaster/Toast";

export const Nft = () => {
    const {current: abortController} = useRef(new AbortController());
    const {address, token_id} = useParams();
    const [Nft, setNft] = useState<INFT>();
    const selector = useAppSelector(state => state.UserReducer);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const {save} = useNewMoralisObject("Likes");
    const [isLiked, setIsLiked] = useState(false);
    const like = Moralis.Object.extend("Likes");
    const query = new Moralis.Query(like);
    const [disable, setDisable] = useState(false);
    const [list, setList] = useState<ToastProperties[]>([]);

    query.containedIn("UserAddress", [
        selector.wallet
    ])
    query.containedIn("Address", [
        address
    ])
    query.containedIn("Token", [
        token_id
    ])

    let toastProperties = null;

    const subscribeToNft =  () => {
        setIsLiked(!isLiked);
        setDisable(true);
        query.first().then((r) => {
            console.log(r);
            if (r === undefined) {
                const data = {
                    Token: token_id,
                    Address: address?.toLowerCase(),
                    UserAddress: selector.wallet
                }
                save(data, {
                    onSuccess: (r) => {
                        setIsLiked(true);
                        removeDisable();
                    },
                    onError: (e) => {
                        setIsLiked(false)
                        removeDisable();
                        showToast('fail');
                    }
                })
            } else {
                r.destroy().then(() => {
                    setIsLiked(false);
                    removeDisable();
                }).catch(() => {
                    setIsLiked(true);
                    removeDisable();
                    showToast('fail');

                })
            }
        }).catch((e) => {
            setIsLiked(!isLiked);
            showToast('fail');
            setDisable(false);
        })
    }

    const removeDisable = () => {
        setTimeout(() => setDisable(false), 500);
    }


    useEffect(() => {
        getNft(address!, token_id!, abortController)
            .then((r) => {
                console.log(r);
                setNft(r);
                const data = {
                    address: address,
                    token: token_id
                }
                dispatch(addBid(data))
                query.first().then((r) => {
                    if (r) {
                        setIsLiked(true)
                    } else {
                        setIsLiked(false);
                    }
                })
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false))
        //@ts-ignore
        dispatch(fetchOwners({address, token_id}));
    }, [])
    const showToast = (type: string) => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: 1,
                    title: 'Success!',
                    description: 'User data were updated successfully',
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
                    <img src={Nft?.image ?? img} className={styles.cardImage}/>
                </div>
                <div className={styles.mainCardInfo}>
                    <div className={styles.topInfo}>
                        <h2 className={styles.name}>{Nft?.metadata.name}</h2>
                        {auth ? <button disabled={disable} className={styles.likeBtn} onClick={subscribeToNft}>
                            {isLiked ? <Icon height={26} width={26} name={"like"}/> :
                                <Icon height={26} width={26} name={"empty-like"}/>}
                        </button> : null}
                    </div>
                    <div className={styles.price}>
                        <NftCost cost={10} currency={"ETH"}/>
                        <span className={styles.currentPrice}>{Nft?.amount} in stock</span>
                    </div>
                    <NftInfoSwitcher/>
                </div>
            </div>
            <Toast list={list} position={'bottom_right'} setList={setList}/>
        </div>

    )
}