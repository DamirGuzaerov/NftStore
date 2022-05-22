import styles from './upload.module.sass';
import {FileInput} from "../../components/ui/inputs/dragdrop/fileInput";
import {useState} from "react";
import img from '../../assets/images/tempImg/nftPreviewImg.png';
import Icon from "../../components/ui/icon/icon";
import {TextInput} from "../../components/ui/inputs/input/textInput";
import {DropDown} from "../../components/dropdown/dropDown";
import {DefaultButton} from "../../components/ui/buttons/default-button";
import Moralis from "moralis";
import Web3 = Moralis.Web3;
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import {Toast, ToastProperties} from "../../components/ui/toaster/Toast";

const web3 = new Web3(Web3.givenProvider);


export const UploadNFT = () => {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState([]);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [propertie, setPropertie] = useState('');
    const [royalty, setRoyalty] = useState(5);
    const [list, setList] = useState<ToastProperties[]>([]);
    const selector = useAppSelector(state => state.UserReducer);
    let toastProperties = null;
    const showToast = (type: string) => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: 1,
                    title: 'Success!',
                    description: 'NFT were uploaded successfully',
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
            default:
                toastProperties = [];
        }

        // @ts-ignore
        setList([toastProperties]);
    }

    async function upload() {
        console.log(preview);
        if (preview != null) {
            const imageFile = new Moralis.File(itemName, file);
            await imageFile.saveIPFS();
            const imageUrl = imageFile.url();

            const metadata = {
                'name': itemName,
                'description': description,
                'image': imageUrl
            };
            const metadataFile = new Moralis.File(`${itemName}metadata.json`, {base64: btoa(JSON.stringify(metadata))});
            await metadataFile.saveIPFS();
            const metadataUri = metadataFile.url();

            let res = Moralis.Plugins.rarible.lazyMint({
                chain: 'eth',
                userAddress: selector.wallet,
                tokenType: 'ERC721',
                tokenUri: metadataUri,
                royaltiesAmout: royalty
            }).then(() => {
                showToast('success');
            }).catch(() => {
                showToast('fail');
            })
        } else {
            alert('enter all values');
        }
    }


    return (
        <>
            <div className={styles.background_uploadPage}>
                <div className={styles.uploadPage_container}>
                    <div className={styles.create_nft_container}>
                        <h1>
                            Create single collectible
                        </h1>

                        <p className={styles.input_block_main_description}>
                            Upload file
                        </p>
                        <p className={styles.input_block_description}>
                            Drag or choose your file to upload
                        </p>

                        <FileInput setFile={setFile} setPreview={setPreview}/>

                        <p className={styles.input_block_main_description}>
                            Item details
                        </p>

                        <TextInput placeholder={'e. g. "Redeemable Bitcoin Card with logo"'}
                                   globalPlaceholder={'ITEM NAME'}
                                   setValue={setItemName}/>

                        <TextInput placeholder={'e. g. “After purchasing you will able to recived the logo...”'}
                                   globalPlaceholder={'description'} setValue={setDescription}/>

                        <label>
                            <p className={styles.label_font_description}>
                                Royalties
                            </p>
                            <DropDown items={['10%', '20%', '30%', '40%']} name={'Royalties'}/>
                        </label>
                        <div className={styles.subsettings}>
                            <TextInput placeholder={'e. g. Size'}
                                       globalPlaceholder={'size'} setValue={setAmount}/>
                            <TextInput placeholder={'e. g. Propertie'}
                                       globalPlaceholder={'propertie'} setValue={setPropertie}/>
                        </div>
                        <div className={styles.createButton_container}>
                            <DefaultButton value={'Create item'} paddingRightLeft={24} type={'fdf'}
                                           paddingTopBottom={16}
                                           func={() => upload()}/>
                        </div>

                    </div>

                    <div className={styles.preview_container}>
                        <div className={styles.preview_card}>
                            <h2>Preview</h2>
                            {preview ? (<img src={preview} className={styles.preview_img}/>)
                                : (<div className={styles.preview_img}>
                                    <p>Upload image</p>
                                </div>)}

                            <div className={styles.nft_content}>
                                <div className={styles.nft_content_row}>
                                    <p>
                                        {itemName}
                                    </p>

                                    <div className={styles.nft_price}>
                                        <p>
                                            {''} ETH
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.nft_content_row}>
                                    <img className={styles.creatorAvatar} src={''} alt=""/>
                                    <p>
                                        {amount} in stock
                                    </p>
                                </div>

                                <div className={styles.nft_content_row}>
                                <span className={styles.bet}>
                                    <Icon name={'nftbet'} width={20} height={20}/>
                                    <p className={styles.highest_bet}>
                                        Highest bid
                                    </p>
                                    <p className={styles.bet_price}>
                                        0.00 ETH
                                    </p>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toast list={list} position={'bottom_right'} setList={setList}/>
        </>
    );
};