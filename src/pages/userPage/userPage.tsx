import styles from './userPage.module.sass';
import pic from '../../assets/images/tempImg/nftPreviewImg.png';
import Icon from "../../components/ui/icon/icon";
import React, {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Link, Outlet, useParams} from "react-router-dom";
import {useMoralis, useMoralisQuery} from "react-moralis";
import Moralis from "moralis";
import {Oval} from "react-loader-spinner";

export interface UserAttributes {
    username: string;
    ethAddress: string;

    [x: string | number | symbol]: unknown;
}

export interface UserInterface {
    id: string;
    attributes: UserAttributes;

    [x: string | number | symbol]: unknown;
}

export const UserPage = () => {
    const [user, setUser] = useState<Moralis.Object<Moralis.Attributes>>();
    const {isInitialized} = useMoralis();
    const [isLoading, setIsLoading] = useState(true);
    const {wallet} = useParams();
    const {fetch} = useMoralisQuery(
        "User",
        (query) => query.equalTo("ethAddress", wallet),
        [],
        {autoFetch: false}
    );
    const getUser = () => {
        fetch({
            onSuccess: (user: Moralis.Object<Moralis.Attributes>[]) => {
                console.log(user)
                setUser(user[0]);
            },
            onError: (error) => {
                console.log(error)
            },
        }).then(r => {
            setIsLoading(false);
        });
    };
    useEffect(() => {
        if (isInitialized)
            getUser();
    }, [isInitialized])
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const img = "https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=h600"
    return (
        <div className={styles.profile_container_wrapper}>
            {isLoading && <div className={styles.loading}>
                <Oval color="#00BFFF" height={100} width={100}/>
            </div>}
            {!isLoading && <>
                <header className={styles.bannerHeader}>
                    <div className={styles.bannerWrapper}>
                        <img className={styles.bannerImg} src={img} alt=""/>
                    </div>
                </header>
                <div className={styles.profile_container}>
                    <div className={styles.profile}>
                        <div className={styles.profile_info_block}>
                            <img className={styles.profile_avatar} src={pic}/>
                            <p className={styles.profile_name}>
                                {(user != undefined) ? user!.get("name") : "unknown"}
                            </p>
                            <p className={styles.wallet}>
                                {wallet}
                                <Icon height={16} name={'wallet-link'} width={16}/>
                            </p>
                            <p className={styles.description_profile}>
                                A wholesome farm owner in Montana. Upcoming gallery solo show in Germany
                            </p>
                            <div className={styles.buttons_profile}>
                                <button>
                                    <Icon name={'share'} width={20} height={20}/>
                                </button>
                            </div>
                        </div>
                        <div className={styles.profile_nfts_container}>
                            {(user != undefined) ? <div className={styles.profile_nfts}>
                                <nav className={styles.profile_nav}>
                                    <Link to={'liked'} className={styles.nav_buttons}>
                                        Likes
                                    </Link>
                                    <Link to={'bids'} className={styles.nav_buttons}>
                                        Bids
                                    </Link>
                                </nav>
                                <Outlet/>
                            </div>:<>
                                <div className={styles.sadIcon}>
                                    <Icon width={56} height={56} name={"sadFace"}/>
                                </div>
                                <h2 className={styles.not_authorized_message}>This user is not authorized</h2>
                            </>}
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}