import {useEffect} from "react";
import Moralis from "moralis";
import {useAppSelector} from "../../../../utils/hooks/redux-hooks";

export const CreatedList = () => {
    const userSelector = useAppSelector(state => state.UserReducer);
    useEffect(() => {
        const options = { chain: 'eth', address: userSelector.wallet }
        const getNfts = async () => {
            const polygonNFTs = await Moralis.Web3.getNFTs(options);
            return polygonNFTs;
        }
        getNfts().then(r => {
            console.log(r);
        })
    }, []);
    return(
      <>
      </>
    );
}