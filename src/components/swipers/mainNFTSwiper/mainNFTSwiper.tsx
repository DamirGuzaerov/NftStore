import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "../nftSwiper/Swiper.module.sass";
import sliderStyles from './MainSwiper.module.sass';
import {MainNFTSlide} from "./mainNFTSlide";
import React, {useEffect, useRef, useState} from "react";
import {INFT} from "../nftSwiper/NFTSwiper";
import {getCollection, getNft, getPrice} from "../../../utils/hooks/getNfts";
import author from "../../../assets/images/tempImg/creatorImg.png";
import {Link} from "react-router-dom";
import {NftBidCard} from "../../ui/nftBidCard/nftBidCard";

export const MainNFTSwiper = () => {
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    useEffect(() => {
        getCollection('0xAd4D85257c815A4B2C7088a664e958b035B24323', 'eth', 5).then(r => {
            setIsLoading(false);
            console.log(NFTs[0])
            setNFTs(r);
        }).catch(() => {
            setIsLoading(false);
        })
    }, [])


    if (isLoading) {
        return (
            <div className={sliderStyles.mainSwiperContainer}>
                <div className={`${sliderStyles.image_settings} ${sliderStyles.skeleton}`} style={{height: 600}}/>

                <div className={sliderStyles.mainSlideContent}>
                    <h1 className={`${sliderStyles.skeleton} ${sliderStyles.skeleton_text}`}></h1>
                    <div className={sliderStyles.creator_container}>
                        <div className={sliderStyles.authorInfo}>
                            <div className={sliderStyles.author_avatar_wrapper}>
                                <div className={`${sliderStyles.author_avatar} ${sliderStyles.skeleton}`}/>
                            </div>
                            <div className={sliderStyles.author_name}>
                                <p>Creator</p>
                                <p className={`${sliderStyles.skeleton} ${sliderStyles.skeleton_text}`}> </p>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className={`${sliderStyles.price_container} ${sliderStyles.skeleton} ${sliderStyles.price_container_loading}`}>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className={styles.customSwiper}
        >
            {NFTs.map((e) => {
                return (
                    <SwiperSlide key={e.token_id}>
                        <MainNFTSlide address = {e.token_address} token_id = {e.token_id} creatorImgUrl={e.name} imgUrl={e.image} nftCost={'0'} nftLikes={'0'}
                                      nftName={e.metadata.name}/>
                    </SwiperSlide>
                );
            })}
            <div ref={navigationPrevRef}/>
            <div ref={navigationNextRef}/>
        </Swiper>
    );
}