import {useAppSelector} from "./redux-hooks";
export const useAuth = () => {
    const selector = useAppSelector(state => state.UserReducer.token);
    if(selector === '') {
        return false;
    } else {
        return true;
    }
}