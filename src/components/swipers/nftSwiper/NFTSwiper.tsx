import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../../cards/nftPreviewCard/nftPreviewCard";
import authorImg from "../../../assets/images/tempImg/creatorImg.png";
import {Oval} from 'react-loader-spinner'
import {getCollection} from "../../../utils/hooks/getNfts";

export interface INFT {
    amount: string,
    contract_type: string,
    metadata: any,
    name: string,
    symbol: string,
    synced_al?: string,
    token_address: string,
    token_id: string,
    image: string,
    price?: number
    token_uri: string
}

const NFTSwiper = () => {
    const [isLoading, setIsLoading] = useState(true);
    let index = 0;
    const [NFTs, setNFTs] = useState<INFT[]>();

    useEffect(() => {
        getCollection('0xED5AF388653567Af2F388E6224dC7C4b3241C544', 'eth', 15).then(r => {
            setIsLoading(false);
            setNFTs(r);
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
                                    imgUrl={nft.image}
                                    creatorImgUrl={authorImg}
                                    nftCost={'0'}
                                    nftName={nft.metadata.name}
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

