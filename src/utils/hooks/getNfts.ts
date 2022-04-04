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
            parseImage(JSON.parse(e.metadata).image, e);
        } else {
            promises.push(axios.get(e.token_uri).then((r) => {
                parseImage(r.data.image, e);
                e.name = r.data.name;
            }))
        }
    })
    return Promise.all(promises).then(() => {
        return prom
    });
}

async function setImage(elem: INFT) {
    if (elem.metadata != null) {
        parseImage(JSON.parse(elem.metadata).image, elem);
        return elem;
    } else {
        return axios.get(elem.token_uri).then(async (r) => {
            await parseImage(r.data.image, elem);
            elem.name = r.data.name;
            return elem;
        })
    }
}

function parseImage(image: string, elem: INFT) {
    if (!image.includes('ipfs://')) {
        elem.image = image
    } else {
        elem.image = image.replace('ipfs:/', 'https://ipfs.io/ipfs');
    }
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
        return setImage(r.data);
    }).catch(e => {
        return e;
    })
}

export async function getOwner(address: string, token_id: string) {
    return axios.get(url + `nft/${address}/${token_id}/owner`, {
        headers: {
            'X-API-KEY': process.env.REACT_APP_X_API_KEY ?? 'update api key'
        },
        params: {

        }
    })
}

export async function getPrice(address: string, chain?: string, exchange?: string, e?: INFT) {
    return axios.get(url + `/erc20/${address}/price`, {
        headers: {
            'X-API-KEY': process.env.REACT_APP_X_API_KEY ?? 'update api key'
        },
        params: {
            address: address
        }
    })
        .then(r => {
            console.log(r.data);
        })
        .catch(e => {
            console.log(e);
        })
}

