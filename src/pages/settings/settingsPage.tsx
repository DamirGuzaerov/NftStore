import styles from './settingsPage.module.sass';
import {Link} from "react-router-dom";
import Icon from "../../components/ui/icon/icon";
import profileImage from '../../assets/images/tempImg/nftPreviewImg.png';
import {useState} from "react";
import {DefaultButton} from "../../components/ui/buttons/default-button";
import {useMoralis, useMoralisCloudFunction} from "react-moralis";
import {Toast, ToastProperties} from "../../components/ui/toaster/Toast";
import {SettingsTextInput} from "../../components/ui/inputs/settingsTextInput/settingsTextInput";
import Moralis from "moralis";

export const SettingsPage = () => {
    const [name, setName] = useState();
    const [list, setList] = useState<ToastProperties[]>([]);
    const [email, setEmail] = useState();
    const [bio, setBio] = useState();
    const query = new Moralis.Query(Moralis.User);
    const currentUser = Moralis.User.current();
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
        currentUser?.set({
            name: name === "" ? undefined : name,
            email: email === "" ? undefined : email,
            bio: bio === "" ? undefined : bio
        })
        console.log(isBio,isEmail,bio,email,name)
        console.log(user);
        console.log(currentUser)
        if(isBio && isEmail) {
            console.log(name,email,bio)
            currentUser?.set({
                name: name === "" ? undefined : name,
                email: email === "" ? undefined : email,
                bio: bio === "" ? undefined : bio
            })
            setUserData({
                name: name === "" ? undefined : name,
                email: email === "" ? undefined : email,
                bio: bio === "" ? undefined : bio
            }).then(r => {
                showToast('success');
            }).catch(e => {
                console.log(e);
                showToast('fail');
            })
        } else {
            showToast('emailFail');
        }
    }

    return (
        <>
            <div className={styles.upload_page_background}>
                <div className={styles.upload_page__container}>
                    <div className={styles.upload_page__header}>
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
                    <p className={styles.page_label__description}>
                        You can set preferred display name and manage other personal settings.
                    </p>
                    <div className={styles.profile__settings_container}>
                        <div className={styles.account__info_container}>
                            <p className={styles.image__title}>
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