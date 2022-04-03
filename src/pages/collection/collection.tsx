import styles from "./collection.module.sass";
import React, {useEffect, useRef, useState} from "react";
import {Oval} from "react-loader-spinner";
import NftPreviewCard from "../../components/nftPreviewCard/nftPreviewCard";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {getNft} from "../../utils/hooks/getNfts";

const Collection = () => {
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentOffset,setCurrentOffset] = useState(0);
    const [fetching,setFetching] = useState(true);

    const limit = 40;

    function fetchNFTs() {
        getNft('0xED5AF388653567Af2F388E6224dC7C4b3241C544', limit, "eth")
            .then(
                result => {
                    console.log(result)
                    setNFTs([...NFTs,...result])
                    setCurrentOffset(prevState => prevState+limit)
                    setIsLoading(false)
                })
            .finally(()=>setFetching(false));
    }

    useEffect(()=>{
        if(fetching){
            setIsLoading(true)
            fetchNFTs();
        }
    },[fetching])

    function scrollHandler() {
        if (
            Math.ceil(window.innerHeight + window.scrollY) >=
            document.documentElement.offsetHeight && NFTs.length < 10000
        ){
            setFetching(true);
        }
    }

    useEffect(()=>{
        document.addEventListener("scroll",scrollHandler);
        return function (){
            document.removeEventListener("scroll",scrollHandler);
        }
    })

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
                                imgUrl={nft.token_uri}
                                creatorImgUrl={authorImg}
                                nftCost={"0"}
                                nftName={nft.name}
                                nftLikes={'0'}
                            />
                        )
                    })}
                </div>
            </div>
            {isLoading && <div className={styles.loading}>
                <Oval color="#00BFFF" height={100} width={100} />
            </div>}
        </>
    );
}

export default Collection;
