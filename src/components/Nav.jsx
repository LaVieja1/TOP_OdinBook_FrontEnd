/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserIcon from './UserIcon';
import { Tooltip } from '@mui/material';
import '@emotion/styled';
import { useNavigate } from "react-router-dom";
import FriendRequests from './FriendRequests';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Nav({ updateUser, setUpdateUser }) {
    const [friendModalIsOpen, setFriendModalIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = Cookies.get('jwt_token');
    const userId = Cookies.get('user_id');
    const logOut = () => {
        Cookies.remove('jwt_token');
        Cookies.remove('user_id');
        navigate('/login');
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch (
                'http://localhost:3000/users/' + userId,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            const data = await response.json();
            setUser(data);
        };
        fetchUser();
        setUpdateUser(false);
    }, [updateUser]);

    if (!token || token == 'undefined' || token == null) {
        navigate('login');
    }

    if (user)
        return (
            <nav className="flex bg-azul_claro py-2 px-0 justify-between shadow-lg shadow-neutral-400">
                <button className="ml-4 bg-transparent border-none py-2.5 px-0 flex items-center justify-center text-center">
                    <Link to={'/home'} className="no-underline text-black transition-transform duration-500 font-bold text-3xl hover:underline hover:decoration-azul hover:underline-offset-4 hover:translate-y-1">OdinBook</Link>
                </button>
                <div className="flex items-center">
                    <UserIcon user={user} />
                    <Tooltip title='Solicitudes de amistad'>
                        <button
                            className="rounded-[50%] mr-7 ml-7 border-none p-0 h-10 bg-transparent hover:shadow-[0_0_10px_#9381FF] hover:cursor-pointer"
                            onClick={() => setFriendModalIsOpen(true)}
                        >
                            <img
                                className="h-10 bg-transparent"
                                src="/mood-plus.svg"
                                //src="https://res.cloudinary.com/djvf2vnbp/image/upload/v1705879385/mhiguydvpu0ulnnmsyuu.png"
                                alt="friends img"
                            />
                        </button>
                    </Tooltip>
                    <FriendRequests
                        friendModalIsOpen={friendModalIsOpen}
                        setFriendModalIsOpen={setFriendModalIsOpen}
                        friendRequests={user.friendRequests}
                        setUpdateUser={setUpdateUser}
                        id={user._id}
                    />
                    <Tooltip title='Opciones'>
                        <Link className="mr-7 rounded-[50%] border-none p-0 h-10 bg-transparent hover:shadow-[0_0_10px_#9381FF] hover:cursor-pointer hover:bg-azul" to={'/settings'}>
                            <img
                                className="h-10 bg-transparent rounded-[50%]"
                                src="/settings.svg"
                                //src="https://res.cloudinary.com/djvf2vnbp/image/upload/v1705879723/k6up39fv70zuajapijnw.png"
                                alt="settings icon"
                            />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Cerrar sesión">
                        <button className="mr-7 rounded-[50%] border-none p-0 h-10 bg-transparent hover:shadow-[0_0_10px_#9381FF] hover:cursor-pointer hover:bg-azul" onClick={logOut}>
                            <img
                                className="h-10 bg-transparent"
                                src="/logout.svg"
                                //src="https://res.cloudinary.com/djvf2vnbp/image/upload/v1705958656/qdf2cx5fcezk0dpvbyza.png"
                                alt="cerrar sesión"
                            />
                        </button>
                    </Tooltip>
                </div>
            </nav>
        );
}

export default Nav;