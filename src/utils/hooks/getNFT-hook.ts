import {useEffect, useState} from "react";
import Moralis from "moralis";
import {NFTContent} from "../../components/swipers/nftSwiper/NFTSwiper";
import axios from "axios";

export type chainType = "eth" | "0x1" | "ropsten" | "0x3" | "rinkeby" | "0x4" | "goerli" | "0x5" | "kovan" | "0x2a" | "polygon";


export function useNFT(address: string, limit: number, chain: chainType) {
    const [NFTs, setNFTs] = useState<NFTContent[]>();
    useEffect(() => {
        async function fetchNFT(): Promise<void | any[]> {
            const NFTs = await Moralis.Web3API.token.getAllTokenIds({address: address, chain: chain, limit: limit});
            let promises: any[] = [];
            let nfts: NFTContent[] = [];

            NFTs.result?.forEach((e) => {
                if (e.token_uri != null) {
                    promises.push(
                        axios.get(e.token_uri)
                            .then(response => {
                                console.log(response);
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

            return Promise.all(promises).then(() => {
                setNFTs(nfts);
            })
                .catch(() => {
                    return [];
                });
        }

        fetchNFT();

    }, []);
    return NFTs;
}

// {address:'0xED5AF388653567Af2F388E6224dC7C4b3241C544',chain:"eth",limit:600}
