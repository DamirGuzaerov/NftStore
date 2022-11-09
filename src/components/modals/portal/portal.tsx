import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
interface Portal {
    className: string,
    elem: string,
    role: string,
    children: any
}
export const Portal = ({className = 'portal-root', elem = 'div', children}: Portal) => {
    const [container] = useState(document.createElement(elem));

    container.classList.add(className);
    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        }
    }, []);
    return createPortal(children, container);
};