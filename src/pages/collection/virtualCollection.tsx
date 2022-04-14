import {
    AutoSizer,
    InfiniteLoader,
    List, WindowScroller
} from "react-virtualized";

import React, {useEffect, useRef, useState} from "react";
import {getNftCollectionByName} from "../../utils/services/nftServices/getNftAddressByName";
import {Link, useParams} from "react-router-dom";
import {getCollection} from "../../utils/hooks/getNfts";
import NftPreviewCard from "../../components/cards/nftPreviewCard/nftPreviewCard";
import authorImg from "../../assets/images/tempImg/creatorImg.png";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {current} from "@reduxjs/toolkit";
import styles from "./collection.module.sass";
import {DropDown} from "../../components/dropdown/dropDown";

const CARD = {
    WIDTH: 350,
    HEIGHT: 460
};
export const VirtualCollection = () => {

    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const rowsCount = useRef(0);
    const currentOffset = useRef(0);
    const {collectionName} = useParams();

    useEffect(() => {
        fetchNFTs().then(r=>currentOffset.current+=20);
    }, [])

    const collection = getNftCollectionByName(collectionName!.replaceAll('_', ' '))!

    async function fetchNFTs() {
        console.log(currentOffset.current)
        getCollection(collection.address, "eth", 20, currentOffset.current)
            .then(
                result => {
                    setNFTs([...NFTs, ...result])
                    currentOffset.current += 20
                    console.log(currentOffset.current)
                })
    }

    function isRowLoaded({index}: any) {
        console.log(index, rowsCount.current, index < rowsCount.current)
        return index < rowsCount.current
    }

    function loadMoreRows({startIndex, stopIndex}: any) {
        console.log("loadMoreRows")
        return fetchNFTs()
    }

    return (
        <div>
            <header className={styles.collectionHeader}>
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
                <div className={styles.formWrapper}>
                    <div className={styles.form}>
                        <input type="text" placeholder="Search" className={styles.searchInput}>
                        </input>
                        <div className={styles.dropDownContainer}>
                            <DropDown  items={['Price: Hight to Low', 'Price: Low to Hight', 'Most Favorited']} name={'Filter'}/>
                        </div>
                    </div>
                </div>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={Math.ceil(NFTs.length / Math.floor(window.innerWidth / CARD.WIDTH)) + 1}
                    threshold={5}
                >
                    {({onRowsRendered, registerChild}: any) => (
                        <div style={{height:"100%",width:"100%"}}>
                        <AutoSizer>
                            {({width,height}) => {
                                const itemsPerRow = Math.floor(width / CARD.WIDTH);
                                rowsCount.current = Math.ceil(NFTs.length / itemsPerRow);
                                return (
                                    <List
                                        className={styles.List}
                                        width={width}
                                        height={height}
                                        rowCount={rowsCount.current}
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                        rowHeight={CARD.HEIGHT}
                                        style={{color: "white"}}
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
                                                                to={`/assets/${collection.address}/${NFTs[i].token_id}`}>
                                                                <NftPreviewCard
                                                                    key={NFTs[i].token_id}
                                                                    imgUrl={NFTs[i].image}
                                                                    creatorImgUrl={authorImg}
                                                                    nftCost={"0"}
                                                                    nftName={NFTs[i].metadata.name}
                                                                    nftLikes={'0'}
                                                                />
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
                </InfiniteLoader>
        </div>
    );
};
export default VirtualCollection;