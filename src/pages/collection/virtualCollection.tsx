import {
    AutoSizer,
    InfiniteLoader,
    List, WindowScroller
} from "react-virtualized";

import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getNftCollectionByName} from "../../utils/services/nftServices/getNftAddressByName";
import {Link, useParams} from "react-router-dom";
import {getCollection} from "../../utils/hooks/getNfts";
import NftPreviewCard from "../../components/cards/nftPreviewCard/nftPreviewCard";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import styles from "./collection.module.sass";
import {Oval} from "react-loader-spinner";

const CARD = {
    WIDTH: 350,
    HEIGHT: 460
};

const oneFetchLimit = 30;

export const VirtualCollection = () => {
    const {current: abortController} = useRef(new AbortController());
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const rowsCount = useRef(0);
    const currentOffset = useRef(null);
    const {collectionName} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchNFTs(abortController).then(r => {
        });
        return () => {
            abortController.abort();
        }
    }, [])

    const collection = getNftCollectionByName(collectionName!.replaceAll('_', ' '))!

    async function fetchNFTs(controller: AbortController) {
        getCollection(collection.address, "eth", oneFetchLimit, currentOffset, controller)
            .then(
                result => {
                    console.log(result);
                    setNFTs([...NFTs, ...result])
                    setIsLoading(false)
                })
    }

    function isRowLoaded({index}: any) {
        return index < rowsCount.current
    }

    function loadMoreRows({startIndex, stopIndex}: any) {
        return fetchNFTs(abortController)
    }

    if (isLoading) return <div className={styles.loading}>
        <Oval color="#00BFFF" height={100} width={100}/>
    </div>

    return (
        <div>
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
            <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={Math.ceil(NFTs.length / Math.floor(window.innerWidth / CARD.WIDTH)) + 1}
                threshold={24}
            >
                {({onRowsRendered, registerChild}: any) => (
                    <WindowScroller>
                        {({height, scrollTop}) => (
                            <div style={{height: "100%", width: "100%"}}>
                                <AutoSizer>
                                    {({width}) => {
                                        const itemsPerRow = Math.floor(width / CARD.WIDTH);
                                        rowsCount.current = Math.ceil(NFTs.length / itemsPerRow);
                                        return (
                                            <List
                                                className={styles.List}
                                                width={width}
                                                autoHeight
                                                height={height}
                                                rowCount={rowsCount.current}
                                                onRowsRendered={onRowsRendered}
                                                ref={registerChild}
                                                rowHeight={CARD.HEIGHT}
                                                style={{color: "white", backgroundColor: "#141416"}}
                                                scrollTop={scrollTop}
                                                rowRenderer={
                                                    ({index, key, style}) => {
                                                        const items = [];
                                                        const fromIndex = index * itemsPerRow;
                                                        const toIndex = Math.min(fromIndex + itemsPerRow, NFTs.length);
                                                        for (let i = fromIndex; i < toIndex; i++) {
                                                            items.push(
                                                                <div
                                                                    key={NFTs[i].token_id}
                                                                    className={styles.Item}
                                                                    style={{
                                                                        width: CARD.WIDTH,
                                                                        height: CARD.HEIGHT
                                                                    }}
                                                                >
                                                                    <Link
                                                                        key={NFTs[i].token_id}
                                                                        to={`/assets/${collection.address?.toLowerCase()}/${NFTs[i].token_id}/info`}>
                                                                        <NftPreviewCard
                                                                            key={NFTs[i].token_id}
                                                                            imgUrl={NFTs[i].image}
                                                                            creatorImgUrl={authorImg}
                                                                            nftCost={"0"}
                                                                            nftName={NFTs[i].metadata.name}
                                                                            nftLikes={'0'}
                                                                            address={NFTs[i].token_address}
                                                                            token_id={NFTs[i].token_id}/>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                        return (
                                                            <div
                                                                className={styles.Row}
                                                                key={key}
                                                                style={style}
                                                            >
                                                                {items}
                                                            </div>
                                                        )
                                                    }
                                                }
                                            />
                                        )
                                    }}
                                </AutoSizer>
                            </div>
                        )}
                    </WindowScroller>
                )}
            </InfiniteLoader>
        </div>
    );
};