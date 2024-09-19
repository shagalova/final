import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks"
import { selectUser } from "../redux/users/userSlice"

const PrivateRoute = () => {
    const isAuth = useAppSelector(selectUser);
    const location = useLocation();

    return (
        isAuth 
        ?
            <Outlet />
        : 
        <Navigate to="/" state={{from: location}} replace />
    );
}

export default PrivateRoute;