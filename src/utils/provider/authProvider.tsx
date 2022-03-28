import {useAuth} from "../hooks/useAuth";
import {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";

export function RequireAuth ({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    if (!auth) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}