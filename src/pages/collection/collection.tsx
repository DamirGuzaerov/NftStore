import styles from "./collection.module.sass";
import React, {useEffect, useRef, useState} from "react";
import {Oval} from "react-loader-spinner";
import NftPreviewCard from "../../components/cards/nftPreviewCard/nftPreviewCard";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {getCollection} from "../../utils/hooks/getNfts";
import {Link, useParams} from "react-router-dom";
import {getNftCollectionByName} from "../../utils/services/nftServices/getNftAddressByName";


const Collection = () => {
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [fetching, setFetching] = useState(true);
    const {collectionName} = useParams()
    const limit = 50;

    const collection = getNftCollectionByName(collectionName!.replaceAll('_', ' '))!

    function fetchNFTs() {
        getCollection(collection.address, "eth", limit, currentOffset)
            .then(
                result => {
                    setNFTs([...NFTs, ...result])
                    setCurrentOffset(prevState => prevState + limit)
                    setIsLoading(false)
                })
            .finally(() => setFetching(false));
    }

    useEffect(() => {
        if (fetching) {
            setIsLoading(true)
            fetchNFTs();
        }
    }, [fetching])

    function scrollHandler() {
        if (
            Math.ceil(window.innerHeight+200 + window.scrollY) >=
            document.documentElement.offsetHeight && NFTs.length < 10000
        ) {
            setFetching(true);
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);
        return function () {
            document.removeEventListener("scroll", scrollHandler);
        }
    },[])

    return (
        <>
            <header className={styles.bannerHeader}>
                <div className={styles.bannerWrapper}>
                    <img className={styles.bannerImg} src={collection.bannerImage} alt=""/>
                </div>
                <div className={styles.headerContent}>
                    <div className={styles.collectionPreviewImgWrapper}>
                        <img className={styles.collectionPreviewImg} src={collection.image} alt=""/>
                    </div>
                    <div className={styles.collectionInfo}>
                        <h2 className={styles.collectionName}>{collection.name}</h2>
                        <h3>Created by <a href="#">Team</a></h3>
                        <p className={styles.collectionDesc}>
                            {collection.description}
                        </p>
                    </div>
                </div>
            </header>
            <div className={styles.collectionGridWrapper}>
                <div className={styles.collectionGrid}>
                    {NFTs.map((nft, index) => {
                        return (
                            <Link key={index}
                                  to={`/assets/${collection.address}/${nft.token_id}/info`}>
                                <NftPreviewCard
                                    imgUrl={nft.image}
                                    creatorImgUrl={authorImg}
                                    nftCost={"0"}
                                    nftName={nft.metadata.name}
                                    nftLikes={'0'}
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>
            {isLoading && <div className={styles.loading}>
                <Oval color="#00BFFF" height={100} width={100}/>
            </div>}
        </>
    );
}

export default Collection;