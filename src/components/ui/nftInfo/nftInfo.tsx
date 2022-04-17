import styles from "./nftInfo.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React from "react";
import {NftBidCard} from "../nftBidCard/nftBidCard";

export const NftInfo = () => {
  return(
      <div className={styles.infoWrapper}>
        <NftBidCard/>
      </div>
  )
}