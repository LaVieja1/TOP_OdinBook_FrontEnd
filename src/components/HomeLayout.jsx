import { Navigate, Outlet  } from 'react-router-dom';
import Cookies from 'js-cookie';

export const HomeLayout = () => {
    const user = Cookies.get('jwt_token');

    return user ? <Navigate to="/home" /> : <Outlet />;
};