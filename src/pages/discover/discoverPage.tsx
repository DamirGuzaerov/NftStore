import styles from './discoverStyles.module.sass';
import {DropDown} from "../../components/dropdown/dropDown";
import {ShopCard} from "../../components/cards/shopCard/shopCard";
import {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {searchNFTs} from "../../utils/hooks/getNfts";
import {DiscoverSearch} from "../../components/ui/search/discoverSearch/discoverSearch";

export const DiscoverPage = () => {

    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [attributes, setAttributes] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        const attr = attrToString();
        if (attr.length == 1) {
            searchNFTs('kitty', 'eth', 15).then(r => {
                setIsLoading(false);
                setNFTs(r);
            }).catch(() => {
                setIsLoading(false);
            })
        } else {
            searchNFTs(attr, 'eth', 15).then(r => {
                setIsLoading(false);
                console.log(r);
                setNFTs(r);
            }).catch(() => {
                setIsLoading(false);
            })
        }
    }, [attributes])

    const attrToString = () => {
        let string = '';
        attributes.forEach(i => {
            string = string + " " + i;
        })
        console.log(string);
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
                <div className={`${styles.rowblock_discover} ${styles.first_line}`}>
                    <h2>
                        Type your keywords
                    </h2>
                    <DiscoverSearch setProp={updateMap}/>
                </div>

                <div className={`${styles.rowblock_discover}`}>
                    <div className={styles.filters}>
                        <DropDown items={['Video', 'Art', 'Game']} name={'Types'} addParam={updateMap}/>
                        <label className={styles.price_range}>
                            PRICE RANGE
                            <input type={"range"} min="1" max="100"/>
                            <span className={styles.input_price_range}>
                                    <span>
                                        0.01 ETH
                                    </span>
                                    <span>
                                        10 ETH
                                    </span>
                                </span>
                        </label>
                        <div className={styles.main_filters}>
                            <label className={styles.filter}>
                                LIKES
                                <DropDown items={['Most liked']} name={'Likes'}/>
                            </label>

                            <label className={styles.filter}>
                                OPEN
                                <DropDown items={['White', 'Green', 'Black', 'Red']} name={'Colors'}
                                          addParam={updateMap}/>
                            </label>


                            <label className={styles.filter}>
                                CREATOR
                                <DropDown items={['Azuki', 'FDFD']} name={'Creator'} addParam={updateMap}/>
                            </label>
                        </div>
                    </div>

                    <div className={styles.types_and_cards}>
                        <nav className={styles.nav_types}>
                            <button id={'allitems'} className={styles.types} onClick={() => setAttributes(new Map())}>
                                All items
                            </button>

                            <button id={'Video'} className={styles.types} onClick={() => updateMap('types', 'video')}>
                                Video
                            </button>

                            <button id={'Game'} className={styles.types} onClick={() => updateMap('types', 'game')}>
                                Game
                            </button>

                            <button id={'Art'} className={styles.types} onClick={() => updateMap('types', 'art')}>
                                Art
                            </button>
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
                    </div>
                </div>
            </div>
        </div>
    );
}