import styles from './discoverStyles.module.sass';
import Icon from "../../components/ui/icon/icon";
import {DropDown} from "../../components/dropdown/dropDown";
import {NavLink} from "react-router-dom";
import {ShopCard} from "../../components/cards/shopCard/shopCard";
import {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {getCollection, searchNFTs} from "../../utils/hooks/getNfts";

export const DiscoverPage = () => {

    const [NFTs, setNFTs] = useState<INFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [attributes, setAttributes] = useState<string[]>();

    useEffect(() => {
        searchNFTs('video', 'eth', 15).then(r => {
            setIsLoading(false);
            setNFTs(r);
            console.log(r)
        }).catch(() => {
            setIsLoading(false);
        })
    }, [])

    const queryString = () => {

    }

    return (
        <div className={styles.discover_page_wrapper}>
            <div className={styles.discover_page}>
                <div className={`${styles.rowblock_discover} ${styles.first_line}`}>
                    <h2>
                        Type your keywords
                    </h2>

                    <button className={styles.searchButton}>
                        <Icon name={'white_search'} width={16} height={16}/>
                    </button>
                </div>

                <div className={`${styles.rowblock_discover}`}>
                    <div className={styles.filters}>
                        <DropDown  items={['Video', 'Art', 'Game']} name={'Types'}/>
                    </div>

                    <div className={styles.types_and_cards}>
                        <nav className={styles.nav_types}>
                            <NavLink to={{pathname: '/discover'}}
                                     className={({isActive}) => (isActive ? styles.types : styles.submited_type)}>
                                All items
                            </NavLink>

                            <NavLink className={({isActive}) => (isActive ? styles.types : styles.submited_type)}
                                     to={'/discover?video'}>
                                Video
                            </NavLink>

                            <NavLink className={({isActive}) => (isActive ? styles.types : styles.submited_type)}
                                     to={'/discover?anotherType'}>
                                EQ
                            </NavLink>

                            <NavLink className={({isActive}) => (isActive ? styles.types : styles.submited_type)}
                                     to={'/discover?other'}>
                                Fdff
                            </NavLink>
                        </nav>

                        {NFTs.length > 0 ? (<div className={styles.cards_container}>
                            {NFTs.map(e => {
                                return <ShopCard key={e.token_id} creatorImgUrl={e.name} imgUrl={e.image} nftCost={'0'}
                                                 nftName={e.metadata.name} address={e.token_address}
                                                 token_id={e.token_id}/>
                            })}
                        </div>): null}
                    </div>
                </div>
            </div>
        </div>
    );
}