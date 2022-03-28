import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../../nftPreviewCard/nftPreviewCard";
import authorImg from "../../../assets/images/tempImg/creatorImg.png";
import axios from "axios";
import Moralis from "moralis";
import {Oval} from 'react-loader-spinner'
import {chainType, useNFT} from "../../../utils/hooks/getNFT-hook";

export interface NFTContent {
    url: string,
    name: string,
    price: string,
    id?: string
}

export interface nft {
    amount?: string,
    contract_type: string,
    metadata?: string,
    name: string,
    symbol: string,
    synced_al?: string,
    token_address: string,
    token_id: string,
    token_url: string
}

const NFTSwiper = () => {
    const [isLoading, setIsLoading] = useState(true);
    let index = 0;
    const [NFTs,setNFTs] = useState<NFTContent[]>([])
    const chain: chainType = "eth";
    let NFTsPromise = useNFT('0xED5AF388653567Af2F388E6224dC7C4b3241C544', 20, chain);

    useEffect(()=>{
        NFTsPromise
            .then(
                result => {
                    setNFTs(result)
                    setIsLoading(false)
                });
    },[])


    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Oval color="#00BFFF" height={50} width={50}/>
            </div>
        )
    }

    return (
        <div className={styles.customSwiperContainer}>
            <h1 className={styles.titleStyle}>Best NFT</h1>
            <div className={styles.customSwiperWrapper}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={32}
                    slidesPerView={4}
                    navigation
                    className={styles.customSwiper}
                >
                    {NFTs?.map(nft => {
                        index++;
                        return (
                            <SwiperSlide key={index}>
                                <NftPreviewCard
                                    imgUrl={nft.url}
                                    creatorImgUrl={authorImg}
                                    nftCost={nft.price}
                                    nftName={nft.name}
                                    nftLikes={'0'}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default NFTSwiper;

