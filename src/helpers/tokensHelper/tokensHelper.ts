interface collectionInfo{
    address:string,
    name:string,
    image:string
}

export const networkCollections = {
    "eth": [
        {
            address: '0x080CE3620a3cfed6119D6c8DB0F9A56e52451729',
            name: 'Satoshi Runners',
            image: 'https://lh3.googleusercontent.com/LezCcPxAQZx3Y9dYOx3eNhrnyn5WnUzVoJRxi2TNU5ApcvjsYjpEh3SOrAwOWJO8d7134yggmL0nMCq-MhIQaW9aY161sA1Sv1mu=s0'
        },
        {
            address: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
            name: 'Azuki',
            image: 'https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s130'
        },
        {
            address: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
            name: 'Doodles',
            image: 'https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s130'
        },
        {
            address: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
            name: 'Azuki',
            image: 'https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s130'
        },
        {
            address: '0x19cB5b009BdAD0Dad0404DD860b0beA75465E678',
            name: 'Trippy Toadz NFT',
            image: 'https://lh3.googleusercontent.com/mhHqco_bu5oRx1TftVg36aztvlsk44FT_RSzHv0MC0erh6_jwJSjdA-dvZumhTLaBo8-HDzTh5xVRGVExLeNbBK4oYK3N9xJxR2CHg=s130'
        },
    ],
}

export const getCollectionsByChain = (chain: "eth") => {
    return networkCollections[chain]
}


