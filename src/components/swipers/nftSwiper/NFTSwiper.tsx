import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../../nftPreviewCard/nftPreviewCard";
import nftImg from "../../../assets/images/tempImg/nftPreviewImg.png";
import authorImg from "../../../assets/images/tempImg/creatorImg.png";
import axios from "axios";
import Moralis from "moralis";

const NFTSwiper = () => {
    const [urls, setUrl] = useState(['']);
    useEffect(() => {
        urls.pop();
        getNFT();
    }, [])


    async function getNFT() {
        const options = {q: "Pancake", filter: "name",limit:50};
        // @ts-ignore
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        let promises: any[] = [];
        let localUrls: string[] = [];

        NFTs.result?.forEach((e) => {
            promises.push(
                axios.get(e.token_uri)
                    .then(response => {
                        localUrls.push(response.data.image_url);
                    }).catch(function (error) {
                    console.log(error)
                })
            )
        })

        Promise.all(promises).then(() => setUrl(localUrls)).catch((reason)=> console.log(reason));
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
                    {urls.map(url => {
                        return (
                            <SwiperSlide key={url}>
                                <NftPreviewCard
                                    imgUrl={url}
                                    creatorImgUrl={authorImg}
                                    nftCost={'1000 ETH'}
                                    nftName={'Amazing NFT'}
                                    nftLikes={'245'}
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

