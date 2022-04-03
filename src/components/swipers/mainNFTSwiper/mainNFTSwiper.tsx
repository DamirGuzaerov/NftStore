import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "../nftSwiper/Swiper.module.sass";
import {MainNFTSlide} from "./mainNFTSlide";
import React, {useEffect, useRef, useState} from "react";
import {INFT} from "../nftSwiper/NFTSwiper";
import {Oval} from 'react-loader-spinner'
import {getCollection, getNft} from "../../../utils/hooks/getNfts";

export const MainNFTSwiper = () => {
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    useEffect(() => {
        getCollection('0xAd4D85257c815A4B2C7088a664e958b035B24323', 'eth', 5).then(r => {
            setIsLoading(false);
            setNFTs(r);
            console.log(getNft('0xED5AF388653567Af2F388E6224dC7C4b3241C544', NFTs[1].token_id));
        }).catch(() => {
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Oval color="#00BFFF" height={50} width={50}/>
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
                        <MainNFTSlide creatorImgUrl={e.name} imgUrl={e.image} nftCost={'0'} nftLikes={'0'}
                                      nftName={e.name}/>
                    </SwiperSlide>
                );
            })}

            <div ref={navigationPrevRef}/>
            <div ref={navigationNextRef}/>
        </Swiper>
    );
}