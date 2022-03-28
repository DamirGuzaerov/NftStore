import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "../nftSwiper/Swiper.module.sass";
import {MainNFTSlide} from "./mainNFTSlide";
import './swiper-settings.module.css';
import React, {useEffect, useState} from "react";
import Moralis from "moralis";
import axios from "axios";
import {NFTContent} from "../nftSwiper/NFTSwiper";
import { Oval } from  'react-loader-spinner'



export const MainNFTSwiper = () => {
    const [NFTs, setNFTs] = useState<NFTContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNFT();
        console.log('works')
    }, [])


    async function getNFT() {
        console.log('nft')
        const options = {q: "cat", filter: "name", chain: "polygon", limit: 3};

        // @ts-ignore
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        let promises: any[] = [];
        let nfts: NFTContent[] = [];

        NFTs.result?.forEach((e) => {
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
    return(
        <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className={styles.customSwiper}
        >
                {NFTs.map((e) => {
                    return(
                        <SwiperSlide key={e.name}>
                            <MainNFTSlide creatorImgUrl={e.name} imgUrl={e.url} nftCost={e.price} nftLikes={'0'} nftName={e.name}/>
                        </SwiperSlide>
                    );
                })}
        </Swiper>
    );
}