import {Header} from "../header/header";
import styles from './layout.module.sass';
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return(
        <div className={styles.div}>
            <Header/>
            <Outlet/>
        </div>
    )
};