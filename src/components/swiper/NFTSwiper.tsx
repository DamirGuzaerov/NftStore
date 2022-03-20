import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../nftPreviewCard/nftPreviewCard";
import nftImg from "../../assets/images/tempImg/nftPreviewImg.png";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import Moralis from "moralis";
import axios from "axios";

const NFTSwiper = () => {
    const [urls, setUrl] = useState(['']);
    useEffect(() => {
        getNFT();
    })
    async function getNFT() {
        const options = {q: 'pancake', chain: 'eth', filter: "name", limit: 5};
        // @ts-ignore
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        let results = [''];
        NFTs.result?.forEach((e) => {
            axios.get(e.token_uri, {})
                .then(function (response) {
                    results.push(response.data.image_url)
                }).catch(function (error) {
            })
        })
        setUrl(results)
    }

    return (
        <div className={styles.customSwiperWrapper}>
            <Swiper
                modules={[Navigation]}
                spaceBetween={1}
                slidesPerView={5}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className={styles.customSwiper}
            >
                <SwiperSlide>
                    <NftPreviewCard
                        imgUrl={urls[0]}
                        creatorImgUrl={authorImg}
                        nftCost={'1000 ETH'}
                        nftName={'Amazing NFT'}
                        nftLikes={'245'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <NftPreviewCard
                        imgUrl={urls[1]}
                        creatorImgUrl={authorImg}
                        nftCost={'1000 ETH'}
                        nftName={'Amazing NFT'}
                        nftLikes={'245'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <NftPreviewCard
                        imgUrl={nftImg}
                        creatorImgUrl={authorImg}
                        nftCost={'1000 ETH'}
                        nftName={'Amazing NFT'}
                        nftLikes={'245'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <NftPreviewCard
                        imgUrl={nftImg}
                        creatorImgUrl={authorImg}
                        nftCost={'1000 ETH'}
                        nftName={'Amazing NFT'}
                        nftLikes={'245'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <NftPreviewCard
                        imgUrl={nftImg}
                        creatorImgUrl={authorImg}
                        nftCost={'1000 ETH'}
                        nftName={'Amazing NFT'}
                        nftLikes={'245'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <NftPreviewCard
                        imgUrl={nftImg}
                        creatorImgUrl={authorImg}
                        nftCost={'1000 ETH'}
                        nftName={'Amazing NFT'}
                        nftLikes={'245'}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default NFTSwiper;

