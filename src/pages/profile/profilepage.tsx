import styles from './profile.module.sass';
import avatar from '../../assets/images/tempImg/creatorImg.png'
import pic from '../../assets/images/tempImg/nftPreviewImg.png';
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import Icon from "../../components/ui/icon/icon";
import NftPreviewCard from "../../components/cards/nftPreviewCard/nftPreviewCard";


export const Profile = () => {
    const user = useAppSelector(state => state.UserReducer);
    return (
        <div className={styles.profile_container_wrapper}>
            <div className={styles.profile_container}>
                <div className={styles.profile}>
                    <div className={styles.profile_info_block}>
                        <img className={styles.profile_avatar} src={avatar}/>

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

                            <button>
                                <Icon name={'options'} width={20} height={20}/>
                            </button>
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
                                    On sale
                                </button>
                                <button className={styles.nav_buttons}>
                                    Collectibles
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

                            <div className={styles.nft_list}>
                                <NftPreviewCard imgUrl={pic} nftName={'name'} nftCost={'cost'} creatorImgUrl={avatar} nftLikes={'0'}/>
                                <NftPreviewCard imgUrl={pic} nftName={'name'} nftCost={'1000'} creatorImgUrl={avatar} nftLikes={'0'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}