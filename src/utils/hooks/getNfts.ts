import axios from "axios";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";

const url = 'https://deep-index.moralis.io/api/v2';

export async function getNft(address: string, chain: string, limit?: number, offset?: number) {
    return axios.get(url + `/nft/${address}`, {
        params: {
            chain: chain,
            limit: limit,
            offset: offset
        },
        headers: {
            'X-API-KEY': process.env.REACT_APP_X_API_KEY ?? 'update api key'
        }
    }).then((response) => {
        return getImages(response.data.result);
    }).catch((er) => {
        return er;
    })
}

async function getImages(prom: INFT[]) {
    let promises: any[] = [];
    let nftsArray: INFT[] =  prom;
    await prom.forEach(e => {
        promises.push(
            axios.get(e.token_uri)
                .then((data) => {
                    if(!data.data.image.includes('ipfs://')) {
                        e.token_uri = data.data.image;
                    } else {
                        e.token_uri = data.data.image.replace('ipfs:/', 'https://ipfs.io/ipfs');
                    }
                })
                .catch(e => {
                    console.log(e.message);
                }))
    });

    return Promise.all(promises).then(() => {
        return nftsArray;
    })
}

export async function getTokenId(address: string, token_id: string, chain?: string, format?: string, limit?: number) {
    return axios.get(url + `/nft/${address}/${token_id}`, {
        headers: {
            'X-API-KEY': process.env.REACT_APP_X_API_KEY ?? 'update api key'
        },
        params: {
            chain: chain,
            format: format,
            limit: limit
        }
    }).then((r) => {
        return r
    }).catch(e => {
        console.log(e);
    })
}

