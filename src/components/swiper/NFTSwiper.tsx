import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../nftPreviewCard/nftPreviewCard";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import Moralis from "moralis";
import axios from "axios";


const NFTSwiper = () => {

    const [urls, setUrl] = useState(['']);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log('work')
        urls.pop();
        getNFT();

    }, []);

    async function getNFT() {
        const options = {q: "Pancake", filter: "name", limit: 5};
        // @ts-ignore
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        let promises: any[] = [];
        let localUrls: any[] = [];

        NFTs.result?.forEach((e) => {
            promises.push(
                axios.get(e.token_uri)
                    .then(response => {
                        console.log(response.data.image_url);
                        localUrls.push(response.data.image_url);
                        console.log(urls);
                    }).catch(function (error) {
                    console.log(error)
                })
            )
        })

        Promise.all(promises).then(() => setUrl(localUrls));
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
    );
}

export default NFTSwiper;

