import styles from './homepageStyles.module.sass';
import axios from "axios";
import {useEffect, useState} from "react";
import Moralis from "moralis";
import {useMoralis} from "react-moralis";

export const Homepage = () => {
     const [url, setUrl] = useState('');

    useEffect(() => {
        // axios.get('https://qtqaadqffvcu.usemoralis.com:2053/server/nft/search', {
        //     params: {
        //         q: 'pancake',
        //         chain: 'eth',
        //         filter: "name"
        //     }
        // }).then(function (response) {
        //     console.log(response);
        // })
        //     .catch(function(error) {
        //         console.log(error);
        //     })

        getNFT();
    })

    async function getNFT() {
        const options = { q: 'pancake', chain: 'eth', filter: "name", limit: 1};
        // @ts-ignore
        const NFTs = await Moralis.Web3API.token.searchNFTs(options);
        let json;
        NFTs.result?.forEach((e) => {
            console.log(e.token_uri);
            axios.get(e.token_uri, {})
                .then(function (response) {
                    setUrl(response.data.image_url);
                    console.log(url);
                }).catch(function (error) {
                    console.log(error)
            })


        })


    }
    return(
      <main>
          <div className={styles.main_container}>
              <h1>NFT of the day</h1>
                <img src={url}/>
          </div>
      </main>
    );
}