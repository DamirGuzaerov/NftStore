import styles from "./nft.module.sass"
import {Link, useParams} from "react-router-dom";
import {getNft} from "../../utils/hooks/getNfts";
import React, {useEffect, useState} from "react";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import {Oval} from "react-loader-spinner";
import {NftCost} from "../../components/ui/nftCost/nftCost";
import {Avatar} from "../../components/ui/avatar/avatar";
import creator from '../../assets/images/tempImg/creator.png'
export const Nft = () =>{
    const {address,token_id} = useParams();
    const [Nft,setNft] = useState<INFT>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        getNft(address!,token_id!)
            .then((r)=>{
                 setNft(r);
            })
            .catch((e)=>console.log(e))
            .finally(()=>setIsLoading(false))
    },[])

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Oval color="#00BFFF" height={50} width={50}/>
            </div>
        )
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.mainCardWrapper}>
                <div className={styles.imageWrapper}>
                    <img src={JSON.parse(Nft!.metadata).image} className={styles.cardImage}/>
                </div>
                <div className={styles.mainCardInfo}>
                    <h2 className={styles.name}>{JSON.parse(Nft!.metadata).name}</h2>
                    <NftCost cost={10} currency={"ETH"}/>
                    <div className={styles.creators}>
                        <Avatar height={50} width={50} imgUrl={creator}/>
                        <div className={styles.userInfo}>
                            Creator
                            <div className={styles.userName}>
                                Azuki Team
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}