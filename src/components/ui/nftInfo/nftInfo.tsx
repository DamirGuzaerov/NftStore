import styles from "./nftInfo.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {Link} from "react-router-dom";
import {pipeString} from "../../../utils/services/stringServices/shortenString";

export const NftInfo = () => {
    const selector = useAppSelector(state => state.OwnerReducer);
    const [creatorInfo, setCreatorInfo] = useState('');
    useEffect(() => {
        try {
            setCreatorInfo(selector.owners[0].token_address);
        } catch (e) {
            setCreatorInfo('author')
        }
    }, [selector]);

  return(
      <div className={styles.infoWrapper}>
          <Link to={"/pageUser/"+creatorInfo}>
          <div className={styles.creators}>
              <Avatar height={50} width={50} imgUrl={creator}/>
              <div className={styles.userInfo}>
                  Creator
                  <div className={styles.userName}>
                      {pipeString(creatorInfo)}
                  </div>
              </div>
          </div>
          </Link>
      </div>
  )
}