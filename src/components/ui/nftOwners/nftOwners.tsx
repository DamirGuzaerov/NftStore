import styles from "./nftOwners.module.sass"
import {Avatar} from "../avatar/avatar";
import creator from "../../../assets/images/tempImg/creator.png";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../utils/hooks/redux-hooks";
import {Link} from "react-router-dom";
import {Oval} from "react-loader-spinner";
import {pipeString} from "../../../utils/services/stringServices/shortenString";
import {CardSkeleton} from "../loading/skeleton/cardSkeleton/cardSkeleton";

export const NftOwners = () => {
    const selector = useAppSelector(state => state.OwnerReducer);
    const [owners, setOwners] = useState(selector.owners);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false)
        setOwners(selector.owners)
    }, [selector.owners.length])

    if (isLoading) {
        return <CardSkeleton/>
    }

    return (
        <div className={styles.owners}>
            {owners.map((item, counter) => {
                return (
                    <Link key={counter} to={"/pageUser/" + item.owner_of}>
                        <div className={styles.owner}>
                            <Avatar height={50} width={50} imgUrl={creator}/>
                            <div className={styles.userInfo}>
                                Owner
                                <div className={styles.userName}>
                                    {pipeString(item.owner_of)}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}