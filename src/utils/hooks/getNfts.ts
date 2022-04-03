import axios from "axios";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";

const url = 'https://deep-index.moralis.io/api/v2';

export async function getCollection(address: string, chain: string, limit?: number, offset?: number) {
    return axios.get(url + `/nft/${address}`, {
        params: {
            chain: chain,
            limit: limit,
            offset: offset
        },
        headers: {
            'X-API-KEY': process.env.REACT_APP_X_API_KEY ?? 'update api key'
        }
    }).then(async (response) => {
        const arr = await setImages(response.data.result);
        return arr;
    }).catch((er) => {
        return er;
    })
}

async function setImages(prom: INFT[]) {
    console.log(prom);
    let promises: any[] = [];
    await prom.forEach((e) => {
            if (e.metadata != null) {
            const image = JSON.parse(e.metadata).image;
            if (!image.includes('ipfs://')) {
                e.image = image
            } else {
                e.image = image.replace('ipfs:/', 'https://ipfs.io/ipfs');
            }
        } else {
                promises.push( axios.get(e.token_uri).then((r) => {
                    let res = r.data.image;
                    if (!res.includes('ipfs://')) {
                        e.image = res
                    } else {
                        e.image = res.replace('ipfs:/', 'https://ipfs.io/ipfs');
                    }
                }))
        }
    })
    return Promise.all(promises).then(()=>{
        return prom
    });
}

export async function getNft(address: string, token_id: string, chain?: string, format?: string, limit?: number) {
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
        return r.data
    }).catch(e => {
        console.log(e);
    })
}

