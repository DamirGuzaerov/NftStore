import {Header} from "../header/header";
import styles from './layout.module.sass';
import {Outlet} from "react-router-dom";
import {Footer} from "../footer/footer";

export const Layout = () => {
    return (
        <div className={styles.container}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
};