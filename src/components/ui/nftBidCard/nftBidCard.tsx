import styles from "./nftBidCard.module.sass"
import {Avatar} from "../avatar/avatar";
import user from "../../../assets/images/tempImg/creator.png";
import {DefaultButton} from "../buttons/default-button";

export const NftBidCard = () => {
    return (
        <>
            <div className={styles.bidCardWrapper}>
                <div className={styles.bidCard}>
                    <div className={styles.highestBidUser}>
                        <Avatar width={50} height={50} imgUrl={user}/>
                        <div className={styles.highestBidInfo}>
                            <p>
                                Highest bid by <span className={styles.userName}>Darth Vader</span>
                            </p>
                            <p className={styles.bid}>
                                <span>1.46 ETH </span>
                                <span className={styles.bidDollars}>
                                     $2,764.89
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.purchaseButtons}>
                        <div className={styles.btnWrapper}>
                            <DefaultButton
                                func={() => alert("Пока не реализовано")}
                                paddingTopBottom={16}
                                type={"default"}
                                value={"Purchase now"}
                                large={true}/>
                        </div>
                        <div className={styles.btnWrapper}>
                            <DefaultButton
                                func={() => alert("Пока не реализовано")}
                                paddingTopBottom={16}
                                type={"action"}
                                value={"Place a bid"}
                                large={true}/>
                        </div>
                    </div>
                    <div className={styles.serviceFeeInfo}>
                        <span className={styles.serviceFeeInfoText}>
                            service fee:
                        </span>
                        <span className={styles.percent}>1.5%</span>
                        <span className={styles.serviceFeeInfoText}>
                            2.563 ETH
                        </span>
                        <span className={styles.serviceFeeInfoText}>
                            $4,540.62
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}