import styles from "./collection.module.sass";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {chainType, useNFT} from "../../utils/hooks/getNFT-hook";
import Moralis from "moralis";
import axios from "axios";
import {Oval} from "react-loader-spinner";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {Navigation} from "swiper";
import NftPreviewCard from "../../components/nftPreviewCard/nftPreviewCard";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import {NFTContent} from "../../components/swipers/nftSwiper/NFTSwiper";

const Collection = () => {
    let {collectionAddress} = useParams();

    const [NFTs, setNFTs] = useState<NFTContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    let index = 0;

    const chain: chainType = "eth";

    console.log(useNFT('0xED5AF388653567Af2F388E6224dC7C4b3241C544', 20, chain));

    useEffect(() => {
        getNFT();
    }, [])

    async function getNFT() {
        const NFTs = await Moralis.Web3API.token.getAllTokenIds({address:'0xED5AF388653567Af2F388E6224dC7C4b3241C544',chain:"eth"});

        let promises: any[] = [];
        let nfts: NFTContent[] = [];

        NFTs.result?.forEach((e) => {
            if (e.token_uri != null) {
                promises.push(
                    axios.get(e.token_uri)
                        .then(response => {
                            let url;
                            if (response.data.image == null) url = response.data.image_url
                            else url = response.data.image
                            nfts.push({url: url, name: response.data.name, price: response.data.price});
                        }).catch(function (error) {
                        console.log(error)
                    })
                )
            }
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

    return (

        <>
            <header className={styles.collectionHeader}>
                <div className={styles.bannerWrapper}>
                    <img className={styles.bannerImg} src="https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=h600" alt=""/>
                </div>
                <div className={styles.headerContent}>
                    <div className={styles.collectionPreviewImgWrapper}>
                        <img className={styles.collectionPreviewImg} src="https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s130" alt=""/>
                    </div>
                    <div className={styles.collectionInfo}>
                        <h2 className={styles.collectionName}>Azuki</h2>
                        <h3>Created by <a href="#">Team Azuki</a></h3>
                        <p className={styles.collectionDesc}>
                            <p>
                                A brand for the metaverse. Built by the community. View the collection at azuki.com/gallery.
                            </p>
                            <p>
                                Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.
                            </p>
                            <p>
                                We rise together. We build together. We grow together.
                            </p>
                            <p>
                                Ready to take the red bean?
                            </p>
                            </p>
                    </div>
                </div>
            </header>
            <div className={styles.collectionGridWrapper}>
                <div className={styles.collectionGrid}>
                    {NFTs.map(nft => {
                        return (
                            <NftPreviewCard
                                imgUrl={nft.url}
                                creatorImgUrl={authorImg}
                                nftCost={nft.price}
                                nftName={nft.name}
                                nftLikes={'0'}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Collection;