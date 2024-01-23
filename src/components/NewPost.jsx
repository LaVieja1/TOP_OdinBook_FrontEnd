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
            'https://top-odinbook-api.onrender.com/posts/',
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
        <div className="w-[95%]">
            <h4 className="relative bottom-6 text-red-600 h-8 m-0 text-center font-bold">{error}</h4>
            <form className="flex w-full min-h-40 h-fit justify-center relative mt-2.5 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] rounded-2xl">
                <textarea
                    onChange={handleChange}
                    value={post}
                    className="w-[100%] rounded-2xl resize-none pt-3 px-[5%] pb-12 border-none text-lg"
                    name="newPost"
                    id="newPost"
                    placeholder="¿En que estas pensando?"
                ></textarea>
                <button
                    className="absolute right-5 bottom-2.5 bg-azul rounded-2xl text-lg font-bold py-2 px-4 border-none transition-all duration-500 hover:shadow-[0_0_10px_rgba(239,122,133,0.8)] hover:bg-azul_claro hover:cursor-pointer"
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