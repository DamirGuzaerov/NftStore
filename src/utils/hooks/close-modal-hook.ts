import {useEffect} from "react";

export function useModalClose(ref: any, handler: Function) {
    useEffect(() => {
        const reference = ref.current;
        const listener = (event: typeof reference) => {
            if (reference === event.target) {
                handler();
            }
            reference?.addEventListener('mousedown', listener);
            return () => reference?.removeEventListener('mousedown', listener);
        }
    }, [ref, handler]);
}
