import styles from './MainSwiper.module.sass';
import author from './../../../assets/images/tempImg/creatorImg.png';
import {Link} from "react-router-dom";
import {nftPreviewProps} from "../../cards/nftPreviewCard/nftPreviewCard";
import { useSpring, animated } from 'react-spring'
import {FC, useEffect} from "react";

export const MainNFTSlide:FC<nftPreviewProps> = ({imgUrl, nftName, nftCost, creatorImgUrl}) => {



    return (
        <div className={styles.mainSwiperContainer}>
            <img src={imgUrl} className={styles.image_settings} alt={imgUrl}/>

            <div className={styles.mainSlideContent}>
                <h1 className={styles.title_nft}>{nftName}</h1>
                <div className={styles.creator_container}>
                    <div className={styles.authorInfo}>
                        <div className={styles.author_avatar_wrapper}>
                            <img src={author} className={styles.author_avatar}/>
                        </div>
                        <div className={styles.author_name}>

                            <p>Creator</p>
                            <Link to={'/'}>{creatorImgUrl}</Link>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
                <div className={styles.price_container}>
                    <h3>
                        Current price
                    </h3>
                    <h2>
                        {nftCost}
                    </h2>
                </div>
                <button className={styles.buy_button}>
                    Buy right now
                </button>
                <button className={styles.view_button}>
                    View item
                </button>
            </div>
        </div>
    );
}