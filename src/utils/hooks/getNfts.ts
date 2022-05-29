import axios, {CancelTokenSource} from "axios";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";
import pic from '../../../src/assets/images/tempImg/nftPreviewImg.png'

const url = 'https://deep-index.moralis.io/api/v2';
const apikey = 'xT5ByvjxK1Inmt1kr5uG9sjt403MBTwy8QLvZNCyBQXs6egE2KSyGBor8fGVLP1B'

export async function getCollection(address: string, chain: string, limit?: number, offset?: number, controller?: AbortController) {
    return axios.get(url + `/nft/${address}`, {
        signal: controller?.signal,
        params: {
            chain: chain,
            limit: limit,
            offset: offset,
        },
        headers: {
            'X-API-KEY': apikey ?? 'update api key',
        }
    }).then(async (response) => {
        const arr = await setImages(response.data.result);
        return arr;
    }).catch((error) => {
        if (axios.isCancel(error)) {
            console.error(error)
        } else if (error.response) {
            if (error.response.status == 429) {
                window.location.replace("/tooManyRequests")
            }
        }
        return error
    });
}

export async function getNft(address: string, token_id: string, contoller?: AbortController, chain?: string, format?: string, limit?: number,) {
    return axios.get(url + `/nft/${address}/${token_id}`, {
        signal: contoller?.signal,
        headers: {
            'X-API-KEY': apikey ?? 'update api key'
        },
        params: {
            chain: chain,
            format: format,
            limit: limit
        }
    }).then((r) => {
        return setImage(r.data);
    }).catch((error) => {
        if (error.response) {
            if (error.response.status == 429) {
                window.location.replace("/tooManyRequests")
            }
        }
        return error
    });
}

async function setImages(prom: INFT[]) {
    let promises: any[] = [];
    await prom.forEach((e) => {
        if (e.metadata != null) {
            const metadata = JSON.parse(e.metadata);
            setMetadata(e, metadata);
            parseImage(metadata.image, e);
        } else {
            promises.push(axios.get(e.token_uri).then((metadata) => {
                parseImage(metadata.data.image, e);
                setMetadata(e, metadata);
            }))
        }
    })
    return Promise.all(promises).then(() => {
        return prom
    });
}

async function setImage(elem: INFT) {
    if (elem.metadata != null) {
        const metadata = JSON.parse(elem.metadata);
        parseImage(metadata.image, elem);
        setMetadata(elem, metadata);
        return elem;
    } else {
        return axios.get(elem.token_uri).then(async (metadata) => {
            await parseImage(metadata.data.image, elem);
            setMetadata(elem, metadata);
            return elem;
        })
    }
}

function setMetadata(elem: INFT, metadata: any) {
    elem.metadata = metadata;
    elem.metadata.name = metadata.name ?? (elem.name + " " + elem.token_id);
}

function parseImage(image: string, elem: INFT) {
    if (image == undefined) {
        elem.image = pic;
        return;
    }
    if (!image.includes('ipfs://')) {
        elem.image = image
    } else if (!image.includes('/ipfs/')) {
        elem.image = image.replace('ipfs:/', 'https://ipfs.io/ipfs');
    } else {
        elem.image = image.replace('ipfs:/', 'https://ipfs.io/');
    }
}


export async function getPrice(address: string, chain?: string, exchange?: string, e?: INFT) {

}

export async function getBalance(address: string, chain?: string) {
    return axios.get(url + `/${address}/balance`, {
        headers: {
            'X-API-KEY': apikey ?? 'update api key'
        },
        params: {
            address: address,
            chain: chain
        }
    }).then((r) => {
        return r.data.balance;
    })
}

export async function searchNFTs(q: string, chain?: string, limit?: number, offset?: number, format?: string, filter?: string, from_date?: string, to_date?: string) {
    return axios.get(url + `/nft/search`, {
        headers: {
            'X-API-KEY': apikey ?? 'update api key'
        },
        params: {
            chain: chain,
            q: q,
            format: format,
            filter: 'name',
            from_date: from_date,
            to_date: to_date,
            offset: offset,
            limit: limit
        }
    }).then(async (response) => {
        const arr = await setImages(response.data.result);
        return arr;
    }).catch((er) => {
        return er;
    })
}

export async function getNFTOwners(address: string, token_id: string, chain?: string, limit?: number) {
    return axios.get(url + `/nft/${address}/${token_id}/owners`, {
        headers: {
            'X-API-KEY': apikey ?? 'update api key',
        },
        params: {
            chain: chain,
            limit: limit,
            format: 'decimal'
        }
    })
        .then(r => {
            return r;
        }).catch((er) => {
            return er;
        })
}

export async function getEthPrice() {
    return axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', {
        headers: {
            authorization: 'Apikey 2a1f0a0ce40d0ccda19b2f1cfdc13a922d2d724fd27d81df0964272906243ac1'
        }
    }).then((r) => {
        return r;
    }).catch((e) => {
        return e;
    })
}


