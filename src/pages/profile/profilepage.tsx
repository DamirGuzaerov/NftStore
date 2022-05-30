import styles from '../profile/profile.module.sass';
import pic from '../../assets/images/tempImg/nftPreviewImg.png';
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import Icon from "../../components/ui/icon/icon";
import NftPreviewCard from "../../components/cards/nftPreviewCard/nftPreviewCard";
import React, {useEffect, useState} from "react";
import {getCollection, getNft} from "../../utils/hooks/getNfts";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useMoralis} from "react-moralis";
import Moralis from "moralis";
import {logOut} from "../../utils/services/userServices/userService";
import {useDispatch} from "react-redux";
import {logOutUser} from "../../stores/reducers/userSlice";


export const Profile = () => {
    const user = useAppSelector(state => state.UserReducer);
    const dispath = useDispatch();
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>();
    const img = "https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=h600";
    const userObj = Moralis.Object.extend("_User");
    const query = new Moralis.Query(userObj);
    const navigate = useNavigate()
    query.containedIn("ethAddress", [
        user.wallet
    ]);
    useEffect(() => {
        query.first().then((r) => {
            setUserData(r?.attributes);
            setIsLoading(false);
        })
        getCollection(user.wallet, 'eth').then((r) => {
            setNFTs(r);
        })
    }, [])

    if (isLoading) {
        return (
            <>
            </>
        )
    }

    function logOutProfile() {
        logOut();
        dispath(logOutUser());
        navigate("/")
    }

    return (
        <div className={styles.profile_container_wrapper}>
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
                            {userData.name}
                        </p>
                        <p className={styles.wallet}>
                            {user.wallet}
                            <Icon height={16} name={'wallet-link'} width={16}/>
                        </p>
                        <p className={styles.description_profile}>
                            {userData.bio}
                        </p>
                        <div className={styles.buttons_profile}>
                            <button>
                                <Icon name={'share'} width={20} height={20}/>
                            </button>
                            <button className={styles.exit_button_wrapper} onClick={logOutProfile}>
                                <p>
                                    Log out
                                </p>
                                <div className={styles.exit_icon}>
                                    <Icon name={'exit'} width={20} height={20}/>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className={styles.profile_nfts_container}>
                        <div className={styles.buttons_edit_row}>
                            <Link to={'/settings'}>
                                <button className={styles.edit_button}>
                                    <p>
                                        Edit profile
                                    </p>
                                    <Icon name={'edit'} width={16} height={16}/>
                                </button>
                            </Link>
                        </div>
                        <div className={styles.profile_nfts}>
                            <nav className={styles.profile_nav}>
                                <Link to={'/profile/collected'} className={styles.nav_buttons}>
                                    Collected
                                </Link>
                                <Link to={'/profile/liked'} className={styles.nav_buttons}>
                                    Likes
                                </Link>
                                <Link to={'/profile/bids'} className={styles.nav_buttons}>
                                    Bids
                                </Link>
                            </nav>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}