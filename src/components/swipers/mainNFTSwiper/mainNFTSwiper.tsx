import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "../nftSwiper/Swiper.module.sass";
import {MainNFTSlide} from "./mainNFTSlide";
import React, {useEffect, useRef, useState} from "react";
import {NFTContent} from "../nftSwiper/NFTSwiper";
import {Oval} from 'react-loader-spinner'
import {chainType, useNFT} from "../../../utils/hooks/getNFT-hook";


export const MainNFTSwiper = () => {
    const [NFTs, setNFTs] = useState<NFTContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const chain: chainType = "eth";
    let NFTsPromise = useNFT('0xED5AF388653567Af2F388E6224dC7C4b3241C544', 5, chain);

    useEffect(() => {
        NFTsPromise
            .then(
                result => {
                    setNFTs(result)
                    setIsLoading(false)
                })
        ;
    }, [NFTsPromise])

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
                    <SwiperSlide key={e.name}>
                        <MainNFTSlide creatorImgUrl={e.name} imgUrl={e.url} nftCost={e.price} nftLikes={'0'}
                                      nftName={e.name}/>
                    </SwiperSlide>
                );
            })}

            <div ref={navigationPrevRef}/>
            <div ref={navigationNextRef}/>
        </Swiper>
    );
}