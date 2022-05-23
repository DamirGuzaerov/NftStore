import styles from './settingsPage.module.sass';
import {Link} from "react-router-dom";
import Icon from "../../components/ui/icon/icon";
import profileImage from '../../assets/images/tempImg/nftPreviewImg.png';
import {useState} from "react";
import {DefaultButton} from "../../components/ui/buttons/default-button";
import {useMoralis, useMoralisCloudFunction} from "react-moralis";
import {Toast, ToastProperties} from "../../components/ui/toaster/Toast";
import {SettingsTextInput} from "../../components/ui/inputs/settingsTextInput/settingsTextInput";

export const SettingsPage = () => {

    const [name, setName] = useState();
    const [list, setList] = useState<ToastProperties[]>([]);
    const [email, setEmail] = useState();
    const [bio, setBio] = useState();
    const {user, setUserData} = useMoralis();
    const [isEmail, setIsEmail] = useState(false);
    const [isBio, setIsBio] = useState(false);
    let toastProperties = null;

    const showToast = (type: string) => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: 1,
                    title: 'Success!',
                    description: 'User data were updated successfully',
                    backgroundColor: '#5cb85c'
                }
                break;
            case 'fail':
                toastProperties = {
                    id: 2,
                    title: 'Failed!',
                    description: 'Something went wrong...',
                    backgroundColor: '#d9534f'
                }
                break;

            case 'emailFail':
                toastProperties = {
                    id: 3,
                    title: 'Failed!',
                    description: 'Invalid email or bio',
                    backgroundColor: '#d9534f'
                }
                break;
            default:
                toastProperties = [];
        }

        // @ts-ignore
        setList([toastProperties]);
    }


    const handleSaveUser = () => {
        console.log(isBio,isEmail,bio,email,name)
        if(isBio && isEmail) {
            console.log(name,email,bio)
            setUserData({
                name: name === "" ? undefined : name,
                email: email === "" ? undefined : email,
                bio: bio === "" ? undefined : bio
            }).then(r => {
                showToast('success');
            }).catch(e => {
                showToast('fail');
            })
        } else {
            showToast('emailFail');
        }
    }

    return (
        <>
            <div className={styles.background_uploadPage}>
                <div className={styles.uploadPage_container}>
                    <div className={styles.uploadPage_header}>
                        <Link to={'/profile'}>
                            <button className={styles.return_button}>
                                <Icon name={'left_arrow'} width={16} height={16}/>
                                <p>
                                    Back to profile
                                </p>
                            </button>
                        </Link>
                    </div>
                    <h1 className={styles.page_label}>
                        Edit profile
                    </h1>
                    <p className={styles.page_label_description}>
                        You can set preferred display name and manage other personal settings.
                    </p>
                    <div className={styles.profile_settings_container}>
                        <div className={styles.profile_image_container}>
                            <img src={profileImage} className={styles.profile_image}/>
                            <div className={styles.profile_image_description_container}>
                                <p className={styles.image_title}>
                                    Profile photo
                                </p>

                                <p className={styles.image_description}>
                                    We recommend an image
                                    of at least 400x400.Gifs work too 🙌
                                </p>
                                <label className={styles.image_upload}>
                                    <p>Upload</p>
                                    <input type={"file"} accept={'image/*'}/>
                                </label>
                            </div>
                        </div>
                        <div className={styles.account_info_container}>
                            <p className={styles.image_title}>
                                Account info
                            </p>
                            <div className={styles.inputs_container}>
                                <SettingsTextInput setValue={setName} placeholder={'Enter your display name'}
                                                   globalPlaceholder={'display name'} setFlag={() => console.log}/>
                                <SettingsTextInput setValue={setEmail} placeholder={'Enter your email'}
                                                   globalPlaceholder={'display email'} setFlag={setIsEmail}/>
                                <SettingsTextInput setValue={setBio} placeholder={'Enter your bio'}
                                                   globalPlaceholder={'bio'} setFlag={setIsBio}/>

                                <p className={styles.desc_inputs}>
                                    To update your settings you should sign message through your wallet. Click 'Update
                                    profile' then sign the message
                                </p>
                            </div>
                            <div className={styles.submit_button_wrapper}>
                                <DefaultButton value={'Update Profile'} type={'submit'} paddingRightLeft={24}
                                               paddingTopBottom={16} func={handleSaveUser}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Toast list={list} position={'bottom_right'} setList={setList}/>
        </>
    );
}