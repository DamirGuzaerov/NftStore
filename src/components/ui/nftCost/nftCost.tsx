import {FC} from "react";
import styles from "./nftCost.module.sass"

interface nftCostProps{
    cost:number,
    currency:string
}
export const NftCost: FC<nftCostProps> = ({cost,currency})=>{
    return(
        <div className={styles.nftCost}>{cost+" "+currency}</div>
    )
}