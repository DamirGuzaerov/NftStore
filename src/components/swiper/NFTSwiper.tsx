import React, {useEffect, useState} from "react";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Swiper.module.sass"
import NftPreviewCard from "../nftPreviewCard/nftPreviewCard";
import nftImg from "../../assets/images/tempImg/nftPreviewImg.png";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import Moralis from "moralis";
import axios from "axios";
import {fetchNFT} from "../../stores/reducers/ActionCreators";
import {useAppDispatch} from "../../utils/hooks/redux-hooks";

const NFTSwiper = () => {

    const [urls, setUrl] = useState(['']);
    useEffect(() => {
        getNFT();
    }, []);

    async function getNFT() {
        const options = {q: 'pancake', chain: 'eth', filter: "name", limit: 5};
        // @ts-ignore
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        let results: string[] = [];

        NFTs.result?.forEach((e) => {
             console.log('mn')
             axios.get(e.token_uri, {})
                .then(function (response) {
                    setUrl([...urls, response.data.image_url]);
                    console.log('added')
                }).catch(function (error) {
                    console.log('error')
            })
        })
        setUrl(results);
        console.log(urls);
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
                    if(url === '') {
                        return
                    }
                    return(
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

