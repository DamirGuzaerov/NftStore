import axios from "axios";
import {INFT} from "../../components/swipers/nftSwiper/NFTSwiper";

export interface NFTContent {
    url: string,
    name: string,
    price: string,
    id?: string
}

const url = 'https://deep-index.moralis.io/api/v2';

export async function getNft(address: string, limit: number, chain: string) {
    return axios.get(url + `/nft/${address}`, {
        params: {
            chain: chain,
            limit: limit
        },
        headers: {
            'X-API-KEY': process.env.REACT_APP_X_API_KEY ?? 'update api key'
        }
    }).then((response) => {
        console.log(response);
        return getImages(response.data.result);
    }).catch((er) => {
        return er;
    })
}

async function getImages(prom: INFT[]) {
    console.log(prom);
    let promises: any[] = [];
    let nftsArray: INFT[] =  prom;
    await prom.forEach(e => {
        promises.push(
            axios.get(e.token_uri)
                .then((data) => {
                    console.log(data.data);
                    e.token_uri = data.data.image;
                })
                .catch(e => {
                    console.log(e);
                }))
    });

    return Promise.all(promises).then(() => {
        return nftsArray;
    })

}

