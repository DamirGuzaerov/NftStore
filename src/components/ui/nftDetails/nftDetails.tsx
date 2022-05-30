import styles from "./nftDetails.module.sass"
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {Oval} from "react-loader-spinner";
import {pipeString} from "../../../utils/services/stringServices/shortenString";

export const NftDetails = () => {
    const selector = useAppSelector(state => state.OwnerReducer);
    const [details, setDetails] = useState(selector.owners[0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            setDetails(selector.owners[0]);
            setIsLoading(false)
        } catch (e) {
            // @ts-ignore
            setDetails({});
            setIsLoading(false);
        }
    }, [selector.owners.length]);

    if(isLoading) return <div className={styles.loading}>
        <Oval color="#00BFFF" height={100} width={100}/>
    </div>

    return (
        <div className={styles.infoWrapper}>
            <ul className={styles.nftDetails}>
                <li className={styles.nftDetail}>
                    <label htmlFor="contractAddress">
                        Contract address:
                    </label>
                    <span className={styles.contractAddress}>
                        {pipeString(details?.token_address)}
                    </span>
                </li>
                <li className={styles.nftDetail}>
                    <label htmlFor="tokenId">
                        Token id:
                    </label>
                    <span id={"tokenId"}>
                        {pipeString(details?.token_id!)}
                    </span>
                </li>
                <li className={styles.nftDetail}>
                    <label htmlFor="Token Standard">
                        Token Standard
                    </label>
                    <span id={"Token Standard"}>
                        {details?.contract_type}
                    </span>
                </li>
                <li className={styles.nftDetail}>
                    <label htmlFor="Blockchain">
                        Blockchain
                    </label>
                    <span id={"Blockchain"}>
                        Ethereum
                    </span>
                </li>
            </ul>
        </div>
    )

}