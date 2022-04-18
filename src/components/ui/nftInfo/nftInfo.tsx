import styles from "./nftInfo.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React from "react";

export const NftInfo = () => {
  return(
      <div className={styles.infoWrapper}>
          <div className={styles.creators}>
              <Avatar height={50} width={50} imgUrl={creator}/>
              <div className={styles.userInfo}>
                  Creator
                  <div className={styles.userName}>
                      Azuki Team
                  </div>
              </div>
          </div>
      </div>
  )
}