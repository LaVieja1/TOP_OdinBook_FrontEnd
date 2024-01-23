/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import UserIcon from '../components/UserIcon';
import Post from '../components/Post';
import NewPost from '../components/NewPost';
import Cookies from 'js-cookie';
import { useOutletContext, useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";
import '@emotion/styled';

function Profile () {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [updatePosts, setUpdatePosts] = useState(false);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);
    const [showRequest, setShowRequest] = useState(false);
    const { id } = useParams();
    const token = Cookies.get('jwt_token');
    const userId = Cookies.get('user_id');
    const [updateUser] = useOutletContext();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch (
                'http://localhost:3000/users/' + id,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            const data = await response.json();
            setUser(data);
                friendRequestCheck(data);
        };
        fetchUser();
    }, [id, updateUser]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                'http://localhost:3000/posts/' + id,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            const data = await response.json();
            setPosts(data);
            setUpdatePosts(false);
        };
        fetchPosts();
    }, [id, updatePosts]);

    // friend request btn should be displayed?
    const friendRequestCheck = (user) => {
        (user.friends.find((friend) => friend._id == userId) || (user._id === userId)) ? setShowRequest(false) : setShowRequest(true);
    }

    const addFriend = async (e) => {
        setAdded(true);
        const friendId = e.target.getAttribute('value');
        const body = {
            to: friendId
        };
        const response = await fetch (
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
            console.error('Error agregando amigo');
            return;
        }
    };

    return (
        <div>
            {user && posts && (
                <div className="w-[90vw] my-[3vh] mx-[5vw] text-black">
                    <header className="flex items-center gap-2">
                        <img
                            src={user.profilePhoto}
                            alt="Foto de perfil del usuario"
                            className="h-40 w-40 object-cover bg-transparent rounded-[50%] border-2 border-azul border-solid"
                        />
                        <h3 className="text-3xl font-bold m-0 ml-2.5">{user.username}</h3>
                        {showRequest && <button
                            className="h-8 w-8 bg-transparent border-none mr-auto rounded-[50%] flex"
                            onClick={addFriend}
                            disabled={added}
                        >
                            <Tooltip title='Añadir amigo'>
                                <img
                                    className="h-8 w-8 rounded-[50%] hover:bg-azul hover:cursor-pointer"
                                    value={user._id}
                                    src="https://res.cloudinary.com/djvf2vnbp/image/upload/v1705886878/ngmfidwozqycsgnkngf5.png"
                                    alt="añadir amigo"
                                />
                                </Tooltip>
                                {added ? <p className="relative -top-1.5 text-green-500">Enviado</p> : <></>}
                        </button>}

                    </header>
                    <div className="flex">
                        <div>
                            <div className="min-w-[28vw] max-w-[400px] h-fit my-5 mr-16 ml-0 rounded-2xl">
                                <h3 className="w-[calc(100%-24px)] rounded-[15px_15px_0_0] m-0 p-2.5 border-2 border-solid border-azul text-xl font-bold">Sobre mi</h3>
                                {user.bio ? <p className="m-0 w-[calc(100%-24px)] rounded-[0_0_15px_15px] p-2.5 border-2 border-solid border-azul border-t-0 min-h-[70px] h-fit">{user.bio}</p> : <p className="m-0 w-[calc(100%-24px)] rounded-[0,0,15px,15px] p-2.5 border-2 border-solid border-blue-500 border-t-0 min-h-[70px] h-fit">No hay nada escrito aún...</p>}

                            </div>
                            <div className="min-w-[28vw] max-w-[400px] h-fit my-5 mr-16 ml-0 rounded-2xl">
                                <h3 className="w-[calc(100%-24px)] rounded-[15px_15px_0_0] m-0 p-2 border-2 border-solid border-azul text-xl font-bold">Amigos</h3>
                                {user.friends.length > 0 ? (
                                    <div className="flex flex-col justify-center items-start gap-2 p-2 w-[calc(100%-24px)] rounded-[0_0_15px_15px] border-2 border-solid border-azul border-t-0">
                                        {'  '}
                                        {user.friends.map((friend) => (
                                            <UserIcon user={friend} key={friend._id} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="m-0 w-[calc(100%-24px)] rounded-[0_0_15px_15px] p-2.5 border-2 border-solid border-azul border-t-0 min-h-[70px] h-fit">No hay amigos aun!</p>
                                )}
                            </div>
                        </div>
                        <div className="-mt-5 w-full flex flex-col justify-start content-end mb-10">
                            {user._id === Cookies.get('user_id') && (
                                <NewPost
                                    id={user._id}
                                    setUpdatePosts={setUpdatePosts}
                                    setError={setError}
                                    error={error}
                                    className='w-full'
                                />
                            )}

                            {posts.length > 0 ? (
                                <>
                                    {posts.map((post) => {
                                        return (
                                            <Post
                                                key={post._id}
                                                post={post}
                                                setError={setError}
                                                setUpdatePosts={setUpdatePosts}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <p>No hay posts aun!</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;