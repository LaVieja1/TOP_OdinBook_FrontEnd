import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Nav from './Nav';
import { useState } from 'react';

export const ProtectedLayout = () => {
    const [updateUser, setUpdateUser] = useState(false);
    const user = Cookies.get('jwt_token');

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Nav updateUser={updateUser} setUpdateUser={setUpdateUser} />
            <Outlet context={[updateUser, setUpdateUser]} />
        </>
    );
};