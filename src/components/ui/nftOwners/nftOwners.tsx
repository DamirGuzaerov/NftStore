import styles from "./nftOwners.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";


export const NftOwners = () => {
   const selector = useAppSelector(state => state.OwnerReducer);
   const [owners] = useState(selector.owners);
   useEffect(() => {}, [])

    if (owners.length == 0) {
        return (
            <p>nothing</p>
        )
    } else {
        return (
            <div className={styles.owners}>
                {owners.map(item => {

                    return (
                        <div key={item.owner_of} className={styles.owner}>
                            <Avatar height={50} width={50} imgUrl={creator}/>
                            <div className={styles.userInfo}>
                                Owner
                                <div className={styles.userName}>
                                    {item.owner_of}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}