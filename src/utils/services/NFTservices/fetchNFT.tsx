import Moralis from "moralis";
import {NFTContent} from "../../../components/swipers/nftSwiper/NFTSwiper";
import axios from "axios";
import {useState} from "react";
import {chainType} from "../../hooks/getNFT-hook";

export interface NFTsContainer{
    total:number,
    nfts:NFTContent[]
}

export async function fetchNFT(address:string,chain:chainType,limit:number|undefined,offset:number):Promise<NFTsContainer> {
    const NFTs = await Moralis.Web3API.token.getAllTokenIds({address: address, chain: chain, limit: limit,offset:offset});
    let promises: any[] = [];
    let NFTsContainer: NFTsContainer = {total:0,nfts:[]};
    NFTsContainer.total = NFTs.total!;
    NFTs.result?.forEach((e) => {
        if (e.token_uri != null) {
            promises.push(
                axios.get(e.token_uri)
                    .then(response => {
                        let url;
                        if (response.data.image == null) url = response.data.image_url
                        else url = response.data.image
                        NFTsContainer.nfts.push({url: url, name: response.data.name, price: response.data.price});
                    }).catch(function (error) {
                    console.log(error)
                })
            )
        }
    })

    await Promise.all(promises)
    return NFTsContainer
}