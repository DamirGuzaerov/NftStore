import styles from "./nftDetails.module.sass"
import React from "react";

export const NftDetails = () => {
    return (
        <div className={styles.infoWrapper}>
            <ul className={styles.nftDetails}>
                <li className={styles.nftDetail}>
                    <label htmlFor="contractAddress">
                        Contract address:
                    </label>
                    <span id={"contractAddress"}>
                        0x23581767a106ae2...6a68b
                    </span>
                </li>
                <li className={styles.nftDetail}>
                    <label htmlFor="tokenId">
                        Token id:
                    </label>
                    <span id={"tokenId"}>
                        766
                    </span>
                </li>
                <li className={styles.nftDetail}>
                    <label htmlFor="Token Standard">
                        Token Standard
                    </label>
                    <span id={"Token Standard"}>
                        ERC-721
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