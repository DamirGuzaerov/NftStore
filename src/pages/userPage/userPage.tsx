import styles from '../profile/profile.module.sass';
import pic from '../../assets/images/tempImg/nftPreviewImg.png';
import Icon from "../../components/ui/icon/icon";
import React, {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Link, useParams} from "react-router-dom";
import {useMoralis, useMoralisQuery} from "react-moralis";
import Moralis from "moralis";
import {Oval} from "react-loader-spinner";
import NftPreviewCard from "../../components/cards/nftPreviewCard/nftPreviewCard";
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
    let neededUser :|undefined|UserInterface;
    const [user,setUser] = useState<Moralis.Object<Moralis.Attributes>>();
    const { isInitialized } = useMoralis();
    const [isLoading, setIsLoading] = useState(true);
    const {wallet} = useParams();
    const { fetch } = useMoralisQuery(
        "User",
        (query) => query.equalTo("ethAddress", wallet),
        [],
        { autoFetch: false }
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
        }).then(r=>{
            setIsLoading(false);
        });
    };

    useEffect(()=>{
        if(isInitialized)
            getUser();
    },[isInitialized])

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
                        {/*{user&&<>*/}
                            <div className={styles.profile_info_block}>
                                <img className={styles.profile_avatar} src={pic}/>
                                <p className={styles.profile_name}>
                                    {(user != undefined)? user!.get("username"):"unknown"}
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

                                    <Link to={'/settings'}>
                                        <button>
                                            <Icon name={'options'} width={20} height={20}/>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.profile_nfts_container}>
                                <div className={styles.buttons_edit_row}>
                                    {user!=undefined&&<button className={styles.edit_button}>
                                        <p>
                                            Edit profile
                                        </p>
                                        <Icon name={'edit'} width={16} height={16}/>
                                    </button>}
                                </div>
                                <div className={styles.profile_nfts}>
                                    <nav className={styles.profile_nav}>
                                        <button className={styles.nav_buttons}>
                                            Collected
                                        </button>
                                        <button className={styles.nav_buttons}>
                                            Created
                                        </button>
                                        <button className={styles.nav_buttons}>
                                            Likes
                                        </button>
                                    </nav>

                                    {NFTs.length > 0 ? (
                                        <div className={styles.nft_list}>
                                            {NFTs.map(item => {
                                                return (<NftPreviewCard creatorImgUrl={item.image} imgUrl={item.image}
                                                                        nftCost={'0'} nftLikes={'0'} nftName={item.name}/>)
                                            })}
                                        </div>) : (
                                        <>
                                            <p className={styles.empty_list_title}> Your NFTs list is empty!</p>
                                            <Link className={styles.empty_list_link} to={'/'}>Find something for
                                                yourself!</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        {/*</>}*/}
                        {/*{user==undefined&&<h1 className={styles.unknownUser}>
                            Unknown user
                        </h1>}*/}
                    </div>
                </div>
            </>}
        </div>
    )
}