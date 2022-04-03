import {FC} from "react";
import styles from './avatar.module.sass'

interface avatarProps{
    imgUrl:string,
    width:number,
    height:number
}
export const Avatar:FC<avatarProps> = ({imgUrl,width,height}) =>{
    const style = {
        width:width,
        height:height
    }

    return(
        <>
            <img src={imgUrl} style={style} alt="" className={styles.image}/>
        </>
    )
}