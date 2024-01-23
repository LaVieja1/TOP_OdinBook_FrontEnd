/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import UserIcon from './UserIcon';
import { Tooltip } from '@mui/material';
import '@emotion/styled';
import Cookies from 'js-cookie';

function FriendsList({ id }) {
    const [friends, setFriends] = useState([]);
    const [updateFriends, setUpdateFriends] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState({});
    const token = Cookies.get('jwt_token');

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await fetch(
                'http://localhost:3000/users/' + id + '/suggested_friends',
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );

            if (!response.ok) {
                console.error('Error obteniendo amigos');
                return;
            }

            const data = await response.json();
            const limitedSuggestions = getRandomElements(data, 10);
            setFriends(limitedSuggestions);
            let buttons = {};

            data.forEach((user) => {
                buttons[user._id] = false;
            });
            setDisabledButtons(buttons);
            setUpdateFriends(false);
        };
        fetchFriends();
    }, [updateFriends]);

    function getRandomElements(arr, num) {
        const copyArr = [...arr];
        const resultArr = [];

        for (let i = 0; i < num; i++) {
            const randomIndex = Math.floor(Math.random() * copyArr.length);
            if (copyArr[i] !== undefined) {
                resultArr.push(copyArr.splice(randomIndex, 1)[0]);
            }
        }
        return resultArr;
    }

    const addFriend = async (e) => {
        const friendId = e.target.getAttribute('value');
        const body = {
            to: friendId
        };
        const response = await fetch(
            'http://localhost:3000/users/' + id + '/friendrequests',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            console.error('Error añadiendo amigo');
            return;
        }
        setUpdateFriends(true);
        setDisabledButtons({ ...disabledButtons, [friendId]: true });
    };

    return (
        <div className="w-fit ml-5 max-lg:hidden">
            <h3 className="text-start text-2xl pt-2.5 pr-0 pb-2.5 pl-1.5 m-0">Amigos sugeridos</h3>
            { friends && friends.length > 0 && (
                <div className="flex flex-col">
                    {friends.map((friend) => (
                        <div className="w-full mb-2.5 flex items-center mr-2.5" key={friend._id}>
                            {'  '}
                            <UserIcon user={friend} />
                            <button
                                className="h-8 w-8 bg-transparent border-none ml-auto rounded-[50%]"
                                onClick={addFriend}
                                disabled={disabledButtons[friend._id]}
                            >
                                <Tooltip title='Añadir amigo'>
                                    <img
                                        className="h-8 w-8 rounded-[50%] hover:bg-azul_claro hover:cursor-pointer"
                                        value={friend._id}
                                        src="/user-plus.svg"
                                        //src="https://res.cloudinary.com/djvf2vnbp/image/upload/v1705886878/ngmfidwozqycsgnkngf5.png"
                                        alt="añadir amigo"
                                    />
                                </Tooltip>
                                {disabledButtons[friend._id] ? <p className="relative -top-15 text-green-500">Enviado</p> : <></>}
                            </button>
                        </div>
                    ))}
                </div>
            ) }{'   '}
            {!friends.length && (
                <p className="ml-1.5">No hay amigos sugeridos</p>
            )}
        </div>
    );
}

export default FriendsList;