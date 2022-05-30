import styles from "./nftInfo.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {Link} from "react-router-dom";
import {pipeString} from "../../../utils/services/stringServices/shortenString";
import {CardSkeleton} from "../loading/skeleton/cardSkeleton/cardSkeleton";

export const NftInfo = () => {
    const selector = useAppSelector(state => state.OwnerReducer);
    const [creatorInfo, setCreatorInfo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        try {
            setCreatorInfo(selector.owners[0].token_address);
            setIsLoading(false);
        } catch (e) {
            setCreatorInfo('author')
            setIsLoading(false);
        }
    }, [selector]);

    if(isLoading) {
        return <CardSkeleton/>
    }

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