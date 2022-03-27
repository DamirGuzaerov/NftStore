import styles from "../home/homepageStyles.module.sass";
import {FC} from "react";
import { Outlet } from "react-router-dom";

const Collections= ()=>{
    return(
        <main>
            <div className={styles.main_container}>
                <Outlet/>
            </div>
        </main>
    );
}

export default Collections;