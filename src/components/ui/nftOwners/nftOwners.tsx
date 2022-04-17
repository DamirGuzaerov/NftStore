import styles from "./nftOwners.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React from "react";

export const NftOwners = () => {
  return(
      <div className={styles.owners}>
          <div className={styles.owner}>
              <Avatar height={50} width={50} imgUrl={creator}/>
              <div className={styles.userInfo}>
                  Owner
                  <div className={styles.userName}>
                      Dio Brando
                  </div>
              </div>
          </div>
          <div className={styles.owner}>
              <Avatar height={50} width={50} imgUrl={creator}/>
              <div className={styles.userInfo}>
                  Owner
                  <div className={styles.userName}>
                      Dio Brando
                  </div>
              </div>
          </div>
          <div className={styles.owner}>
              <Avatar height={50} width={50} imgUrl={creator}/>
              <div className={styles.userInfo}>
                  Owner
                  <div className={styles.userName}>
                      Dio Brando
                  </div>
              </div>
          </div>
      </div>
  )
}