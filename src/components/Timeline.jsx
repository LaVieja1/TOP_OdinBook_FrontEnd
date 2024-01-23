/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import FriendsList from './FriendsList';
import NewPost from './NewPost';
import Post from './Post';
import Cookies from 'js-cookie';

function Timeline ({ id }) {
    const [updatePosts, setUpdatePosts] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = Cookies.get('jwt_token');
            const response = await fetch (
                'http://localhost:3000/posts/' + id + '/all',
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );

            if (!response.ok) {
                console.error('Error cargando posts');
                return;
            }

            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
        setUpdatePosts(false);
    }, [updatePosts]);

    return (
        <div className="flex mt-[3vh] mx-[5vw] mb-0 text-black">
            <div className="flex flex-col items-center w-full mb-10">
                <NewPost
                    id={id}
                    setUpdatePosts={setUpdatePosts}
                    setError={setError}
                    error={error}
                />
                {posts.length > 0 && (
                    <>
                        {posts.map((post) => {
                            return (
                                <Post
                                    post={post}
                                    key={post._id}
                                    setError={setError}
                                    setUpdatePosts={setUpdatePosts}
                                />
                            );
                        })}
                    </>
                )}
            </div>

            <FriendsList id={id} />
        </div>
    );
}

export default Timeline;