import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../../nftPreviewCard/nftPreviewCard";
import authorImg from "../../../assets/images/tempImg/creatorImg.png";
import axios from "axios";
import Moralis from "moralis";
import { Oval } from  'react-loader-spinner'

export interface NFTContent {
    url: string,
    name: string,
    price: string
}

const NFTSwiper = () => {
    const [NFTs, setNFTs] = useState<NFTContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    let index = 0;

    useEffect(() => {
        getNFT();
    }, [])

    async function getNFT() {
        const NFTs = await Moralis.Web3API.token.getAllTokenIds({address:'0xED5AF388653567Af2F388E6224dC7C4b3241C544',chain:"eth",limit:600});
        console.log(NFTs)
        let promises: any[] = [];
        let nfts: NFTContent[] = [];

        NFTs.result?.forEach((e) => {
            console.log(e);
            if (e.token_uri != null) {
                promises.push(
                    axios.get(e.token_uri)
                        .then(response => {
                            let url;
                            if (response.data.image == null) url = response.data.image_url
                            else url = response.data.image
                            nfts.push({url: url, name: response.data.name, price: response.data.price});
                            console.log(e.token_uri)
                        }).catch(function (error) {
                        console.log(error)
                    })
                )
            }
        })

        Promise.all(promises).then(() => {
            setNFTs(nfts);
            console.log(nfts);
            setIsLoading(false);
        })
            .catch((reason) => setNFTs([]));
    }

    if(isLoading) {
        return(
            <div className={styles.loading}>
                <Oval color="#00BFFF" height={50} width={50} />
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
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    className={styles.customSwiper}
                >
                    {NFTs.map(nft => {
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

