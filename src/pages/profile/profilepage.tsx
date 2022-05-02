import styles from './profile.module.sass';
import pic from '../../assets/images/tempImg/nftPreviewImg.png';
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import Icon from "../../components/ui/icon/icon";
import NftPreviewCard from "../../components/cards/nftPreviewCard/nftPreviewCard";
import React, {useEffect, useState} from "react";
import {getCollection, getNft} from "../../utils/hooks/getNfts";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Link} from "react-router-dom";


export const Profile = () => {
    const user = useAppSelector(state => state.UserReducer);
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const img = "https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=h600"

    useEffect(() => {
        getCollection(user.wallet, 'eth').then((r) => {
            setNFTs(r);
        })
    }, [])
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
                            {user.name}
                        </p>
                        <p className={styles.wallet}>
                            {user.wallet}
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
                            <button className={styles.edit_button}>
                                <p>
                                    Edit profile
                                </p>
                                <Icon name={'edit'} width={16} height={16}/>
                            </button>
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
                                <button className={styles.nav_buttons}>
                                    Following
                                </button>
                                <button className={styles.nav_buttons}>
                                    Followers
                                </button>
                            </nav>

                            {NFTs.length > 0 ? (
                                <div className={styles.nft_list}>
                                    {NFTs.map(item => {
                                        return (<NftPreviewCard creatorImgUrl={user.wallet} imgUrl={item.image}
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
                </div>
            </div>
        </div>
    )
}