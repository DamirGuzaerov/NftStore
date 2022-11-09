import styles from './discoverStyles.module.sass';
import {DropDown} from "../../components/dropdown/dropDown";
import {ShopCard} from "../../components/cards/shopCard/shopCard";
import React, {useEffect, useRef, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {searchNFTs} from "../../utils/hooks/getNfts";
import {DiscoverSearch} from "../../components/ui/search/discoverSearch/discoverSearch";
import {Oval} from "react-loader-spinner";

const fetchStep = 10;
export const DiscoverPage = () => {
    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [attributes, setAttributes] = useState<Map<string, string>>(new Map());
    const [stillLeft, setStillLeft] = useState(true)
    const limitRef = useRef(10);

    const searchNext = () => {
        const attr = attrToString();
        if (attr.length <= 1) {
            searchNFTs('kitty', 'eth', limitRef.current).then(r => {
                setIsLoading(false);
                console.log(r)
                if (r.length < fetchStep)
                    setStillLeft(false);
                setNFTs(r);
            }).catch(() => {
                setIsLoading(false);
            }).finally(() => setFetching(false))
        } else {
            searchNFTs(attr, 'eth', limitRef.current).then(r => {
                setIsLoading(false);
                console.log(r);
                if (r.length < fetchStep)
                    setStillLeft(false);
                setNFTs(r);
            }).catch(() => {
                setIsLoading(false);
            }).finally(() => setFetching(false))
        }
    }
    useEffect(() => {
        searchNext()
    }, [attributes])

    useEffect(() => {
        if (fetching && stillLeft) {
            setIsLoading(true)
            limitRef.current += fetchStep
            searchNext()
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);
        return function () {
            document.removeEventListener("scroll", scrollHandler);
        }
    }, [])

    function scrollHandler() {
        if (
            Math.ceil(window.innerHeight + 200 + window.scrollY) >=
            document.documentElement.offsetHeight
        ) {
            setFetching(true);
        }
    }

    const attrToString = () => {
        let string = '';
        attributes.forEach(i => {
            string = string + " " + i;
        })
        return string
    }

    const updateMap = (key: string, value: string) => {
        setAttributes(attributes.set(key, value))
        setAttributes(new Map(JSON.parse(
            JSON.stringify(Array.from(attributes)))));
    }

    return (
        <div className={styles.discover_page_wrapper}>
            <div className={styles.discover_page}>
                <div className={`${styles.rowblock_discover}`}>
                    <div className={styles.filters}>
                        <div className={styles.main_filters}>
                            <label className={styles.filter}>
                                <div className={styles.filter_body}>
                                    LIKES
                                    <DropDown items={['Most liked']} name={'Likes'}/>
                                </div>
                            </label>
                            <label className={styles.filter}>
                                <div className={styles.filter_body}>
                                    OPEN
                                    <DropDown items={['White', 'Green', 'Black', 'Red']} name={'Colors'}
                                              addParam={updateMap}/>
                                </div>
                            </label>
                            <label className={styles.filter}>
                                <div className={styles.filter_body}>
                                    CREATOR
                                    <DropDown items={['Azuki', 'FDFD']} name={'Creator'} addParam={updateMap}/>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className={styles.types_and_cards}>

                        <nav className={styles.nav_types}>
                            <div className={styles.searchContainer}>
                                <DiscoverSearch setProp={updateMap}/>
                            </div>
                            <div className={styles.navItemContainer}>
                                <button id={'allitems'} className={styles.types}
                                        onClick={() => setAttributes(new Map())}>
                                    All items
                                </button>
                                <button id={'Video'} className={styles.types}
                                        onClick={() => updateMap('types', 'video')}>
                                    Video
                                </button>
                                <button id={'Game'} className={styles.types} onClick={() => updateMap('types', 'game')}>
                                    Game
                                </button>
                                <button id={'Art'} className={styles.types} onClick={() => updateMap('types', 'art')}>
                                    Art
                                </button>
                            </div>
                        </nav>

                        {NFTs.length > 0 ? (<div className={styles.cards_container}>
                            {NFTs.map(e => {
                                return <ShopCard key={e.token_id} creatorImgUrl={e.name} imgUrl={e.image} nftCost={'0'}
                                                 nftName={e.metadata.name} address={e.token_address}
                                                 token_id={e.token_id} amount={e.amount}/>
                            })}
                        </div>) : (<div className={styles.not_found_message_wrapper}>
                            <p className={styles.not_found_message}>
                                We found nothing. Try again
                            </p>
                        </div>)}
                        {isLoading && <div className={styles.loading}>
                            <Oval color="#00BFFF" height={100} width={100}/>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}