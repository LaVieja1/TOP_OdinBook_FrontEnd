/* eslint-disable react/prop-types */
import { useState } from "react";
import Cookies from 'js-cookie';

function NewPost (props) {
    const { id, setUpdatePosts } = props;
    const [post, setPost] = useState();
    const [disabledButton, setDisabledButton] = useState(false);
    const [error, setError] = useState(null);
    const token = Cookies.get('jwt_token');

    const handleChange = (e) => {
        setDisabledButton(false);
        setError(null);
        setPost(e.target.value);
    };

    const submitPost = async (e) => {
        setDisabledButton(true);

        if (typeof post === 'undefined' || post === null || post === '') {
            setError('Post no puede estar vacío');
            console.error('Post vacío');
            return;
        }
        e.preventDefault();

        const body = {
            author: id,
            text: post,
        };

        const response = await fetch (
            'http://localhost:3000/posts/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            setDisabledButton(false);
            setError('Post fallido');
            return;
        }

        if (response.ok) {
            setUpdatePosts(true);
            setPost('');
            setDisabledButton(false);
        }
    };

    return (
        <div className="w-full">
            <h4 className="relative bottom-6 text-red-600 h-8 m-0 text-center">{error}</h4>
            <form className="flex w-full min-h-40 h-fit justify-center relative mt-2.5 shadow-md shadow-gray-300 rounded-2xl">
                <textarea
                    onChange={handleChange}
                    value={post}
                    className="w-full rounded-2xl resize-none pt-3 pr-5 pb-12 border-none text-lg"
                    name="newPost"
                    id="newPost"
                    placeholder="¿En que estas pensando?"
                ></textarea>
                <button
                    className="absolute right-5 bottom-2.5 bg-blue-500 rounded-2xl text-lg font-bold py-2 px-4 border-none hover:shadow-sm hover:shadow-blue-400 hover:bg-red-300 hover:cursor-pointer"
                    onClick={submitPost}
                    disabled={disabledButton}
                >
                    Publicar
                </button>
            </form>
        </div>
    );
}

export default NewPost;