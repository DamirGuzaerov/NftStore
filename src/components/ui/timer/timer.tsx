import {useEffect, useRef, useState} from "react";
import styles from './timerStyles.module.sass';


export const Timer = (props: {timer: any}) => {

    const decreaseNum = () => setTime((prev) => prev - 1);
    const [time ,setTime] = useState(Date.parse(new Date().toString()) - Date.parse(props.timer));
    let intervalRef = useRef();
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = Math.floor(time % 3600 % 60);
    const hours = Math.floor(time / 3600 % 24);;
    const days = Math.floor(time / 86400);


    function secondsToHms(time: number) {

        const dDisplay = days > 0 ? days + (days == 1 ? " day, ": " days, "): "";
        const hDisplay = hours > 0 ? hours + (hours == 1 ? " hour, " : " hours, ") : "";
        const mDisplay = minutes > 0 ? minutes + (minutes == 1 ? " minute, " : " minutes, ") : "";
        const sDisplay = seconds > 0 ? seconds + (seconds == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }


    useEffect(() => {
        // @ts-ignore
        intervalRef.current = setInterval(decreaseNum, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);



    return(
        <div className={styles.timer__container}>The auction will end after
            <span className={styles.timer}> {secondsToHms(time)}</span>
        </div>
    )
}