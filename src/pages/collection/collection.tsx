import styles from "../home/homepageStyles.module.sass";
import {useParams} from "react-router-dom";

const Collection = () => {
    let {collectionName} = useParams();
    return(
                <div className={styles.main_container}>
                    {collectionName}
                </div>
    );
}

export default Collection;