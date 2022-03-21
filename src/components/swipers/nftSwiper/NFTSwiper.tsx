import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../../nftPreviewCard/nftPreviewCard";
import authorImg from "../../../assets/images/tempImg/creatorImg.png";
import axios from "axios";
import Moralis from "moralis";

export interface NFTContent {
    url: string,
    name: string,
    price: string
}



const NFTSwiper = () => {
    const [NFTs, setNFTs] = useState<NFTContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNFT();
    }, [])


    async function getNFT() {
        const options = {q: "war", filter: "name", chain: "polygon", limit: 10};

        // @ts-ignore
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        let promises: any[] = [];
        let nfts: NFTContent[] = [];

        NFTs.result?.forEach((e) => {
            console.log(e);
            promises.push(
                axios.get(e.token_uri)
                    .then(response => {
                        nfts.push({url: response.data.image, name: response.data.name, price: response.data.price});
                        console.log(e.token_uri)
                    }).catch(function (error) {
                    console.log(error)
                })
            )
        })

        Promise.all(promises).then(() => {
            setNFTs(nfts);
            console.log(nfts);
            setIsLoading(false);
        })
            .catch((reason) => setNFTs([]));
    }

    if (isLoading) {
        return (
            <p>
                Загрузка
            </p>
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
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    className={styles.customSwiper}
                >
                    {NFTs.map(nft => {
                        return (
                            <SwiperSlide key={nft.url}>
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

