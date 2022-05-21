import styles from "./nftInfoSwitcher.module.sass"
import {NavLink, Outlet} from "react-router-dom";
import {NftBidCard} from "../ui/nftBidCard/nftBidCard";
import React from "react";

export const NftInfoSwitcher = () => {
    return (
        <div className={styles.routesPanelWrapper}>
            <nav className={styles.routerPanel}>
                <ul className={styles.linksList}>
                    <li className={styles.navLink}>
                        <NavLink
                            className={({isActive}) => isActive ? styles.linkActive : styles.link}
                            end to={'info'}>
                            Info
                        </NavLink>
                    </li>
                    <li className={styles.navLink}>
                        <NavLink
                            className={({isActive}) => isActive ? styles.linkActive : styles.link}
                            to={'owners'}>
                            Owners
                        </NavLink>
                    </li>
                    <li className={styles.navLink}>
                        <NavLink
                            className={({isActive}) => isActive ? styles.linkActive : styles.link}
                            to={'details'}>
                            Details
                        </NavLink>
                    </li>

                    <li className={styles.navLink}>
                        <NavLink
                            className={({isActive}) => isActive ? styles.linkActive : styles.link}
                            to={'bids'}>
                            Bids
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.infoContainer}>
                <Outlet/>
                <NftBidCard/>
            </div>
        </div>
    )
}

export default NftInfoSwitcher;