import styles from "./nftInfo.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";

export const NftInfo = () => {
    const selector = useAppSelector(state => state.OwnerReducer);
    const [creatorInfo, setCreatorInfo] = useState('');
    console.log(selector.owners[0]);
    useEffect(() => {
        try {
            setCreatorInfo(selector.owners[0].token_address);
        } catch (e) {
            setCreatorInfo('author')
        }
    }, [selector]);
  return(
      <div className={styles.infoWrapper}>
          <div className={styles.creators}>
              <Avatar height={50} width={50} imgUrl={creator}/>
              <div className={styles.userInfo}>
                  Creator
                  <div className={styles.userName}>
                      {creatorInfo}
                  </div>
              </div>
          </div>
      </div>
  )
}