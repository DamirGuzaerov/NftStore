import styles from './toast.module.sass';
import {useCallback, useEffect} from "react";

export interface ToastProperties {
    id: number,
    title: string,
    description: string,
    backgroundColor: string
}

export const Toast = (props: { list: ToastProperties[], position: string, setList: Function }) => {
    const list = props.list;
    const deleteToast = useCallback(id => {
        const items = list.filter(i => i.id !== id);
        props.setList(items);
    }, [list, props.setList]);

    useEffect(() => {
        if (list.length) {
            const interval = setInterval(() => {
                deleteToast(list[0].id);
            }, 5000);

            return () => {
                clearInterval(interval);
            }
        }
    }, [list])
    return (
        <div className={`${styles.container} ${styles[props.position]}`}>
            {
                list.map((item, i) => (
                    <div
                        key={i}
                        style={{backgroundColor: item.backgroundColor}}
                        className={`${styles.toast} ${styles.notification}`}
                    >
                        <button onClick={() => deleteToast(item.id)}>x</button>
                        <div>
                            <p className={styles.title}>{item.title}</p>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}