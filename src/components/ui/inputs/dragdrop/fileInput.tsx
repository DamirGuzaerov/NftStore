import {FC, useState} from "react";
import styles from './fileInput.module.sass';
import Icon from "../../icon/icon";

interface props {
    setPreview: Function
}
export const FileInput:FC<props> = ({setPreview}) => {
    const [drag, setDrag] = useState(false);

    function dragStartHandler(e: any) {
        e.preventDefault();
        setDrag(true)
    }

    function dragEndHandler(e: any) {
        e.preventDefault();
        setDrag(false)
    }

    function onDropHandler(e: any) {
        e.preventDefault();
        const files = [...e.dataTransfer.files];
        setPreview(URL.createObjectURL(files[0]));
        console.log(files);
        setDrag(false);
    }

    return (
        <>
            {
                drag ?
                    <div className={styles.input_dragAndDrop}
                         onDragStart={e => dragStartHandler(e)}
                         onDragLeave={e => dragEndHandler(e)}
                         onDragOver={e => dragStartHandler(e)}
                         onDrop={e => onDropHandler(e)}>
                        <div className={styles.info_drugAndDrop_container}>
                            <Icon name={'burger'} width={24} height={24}/>
                            <p className={styles.text_drugAndDrop}>
                                Drop your file
                            </p>
                        </div>
                    </div>
                    : <div className={styles.input_dragAndDrop_dropped}
                           onDragStart={e => dragStartHandler(e)}
                           onDragLeave={e => dragEndHandler(e)}
                           onDragOver={e => dragStartHandler(e)}>
                        <div className={styles.info_drugAndDrop_container}>
                            <Icon name={'drug_and_drop'} width={24} height={24}/>
                            <p className={styles.text_drugAndDrop}>
                                PNG, GIF, WEBP, MP4. Max 1Gb.
                            </p>
                        </div>
                    </div>
            }
        </>
    )
}