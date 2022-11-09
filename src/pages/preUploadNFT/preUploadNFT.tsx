import styles from './preUploadNFTStyles.module.sass';
import {Link} from "react-router-dom";
import Icon from "../../components/ui/icon/icon";
import firstImg from '../../assets/images/tempImg/img.png';
import secondImg from '../../assets/images/tempImg/multUpload.png';
import {DefaultButton} from "../../components/ui/buttons/default-button";

export const PreUploadNFT = () => {
    return (
        <div className={styles.background_uploadPage}>
            <div className={styles.uploadPage_container}>
                <div className={styles.uploadPage_header}>
                    <Link to={'/'}>
                        <button className={styles.return_button}>
                            <Icon name={'left_arrow'} width={16} height={16}/>
                            <p>
                                Back to home
                            </p>
                        </button>
                    </Link>
                </div>
                <h1 className={styles.upload_label}>
                    Upload item
                </h1>
                <p className={styles.upload_upper_description}>
                    Choose <span className={styles.white_description}>“Single”</span> if you want your collectible to be
                    one
                </p>

                <div className={styles.upload_type_container}>
                    <div className={styles.upload_type_card}>
                        <img src={firstImg} className={styles.upload_card_img}/>
                        <Link to={'/upload'}>
                            <DefaultButton value={'Create Single'} paddingRightLeft={16} type={'action'}
                                           paddingTopBottom={12} func={console.log}/>
                        </Link>
                    </div>
                </div>
            </div>
            <p className={styles.upload_lower_description}>
                We do not own your private keys and cannot access your funds without your confirmation.
            </p>
        </div>
    );
}