/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom';
import UserIcon from './UserIcon';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import '@emotion/styled';
import Comment from './Comment';
import Cookies from 'js-cookie';
import LikeDisplay from './LikeDisplay';

function Post ({ post, setError, setUpdatePosts }) {
    const [comment, setComment] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const id = Cookies.get('user_id');
    const token = Cookies.get('jwt_token');

    const date = DateTime.fromISO(post.time);
    const humanDate = date
        .toLocaleString(DateTime.DATETIME_SHORT)
        .replace(/,/, ', at');

    const like = async () => {
        const body = {
            userid: id
        };

        const response = await fetch (
            'http://localhost:3000/posts/' + post._id + '/likes',
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
            setError('Error: no se pudo dar like');
            setTimeout(() => {
                setError(null);
            }, '3 segundos');
        }
        setUpdatePosts(true);
    };

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const submitComment = async (e) => {
        e.preventDefault();
        setComment(null);

        const body = {
            userid: id,
            text: comment,
        };

        const response = await fetch(
            'http://localhost:3000/posts/' + post._id + '/comments',
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
            setError('Error: no se pudo comentar');
            setTimeout(() => {
                setError(null);
            }, '3 segundos');
        }
        setUpdatePosts(true);
    };

    const commentLinkClick = () => {
        if (post.comments.length > 0) {
            setComment('');

            if (showComments) {
                setShowComments(false);
                setComment(null);
            } else {
                setShowComments(true);
            }
        }
    };

    const commentForm = (
        <form className='relative w-full my-0.5 mx-0 flex flex-col'>
            <textarea
                onChange={handleChange}
                value={comment}
                className='border-none resize-none min-h-16 rounded-bl-2xl mb-0.5 py-3 pr-10 pl-3 bg-red-400'
                name='commentText'
                id='commentText'
                placeholder='Escribir un comentario...'
            ></textarea>
            <Tooltip title='Cerrar/borrar'>
                <button
                    className='absolute top-1.5 right-1.5 border-none bg-transparent w-min h-6 p-0.5 rounded hover:bg-red-700 hover:cursor-pointer'
                    onClick={() => setComment(null)}
                >
                    <img
                        className='h-5'
                        src='https://res.cloudinary.com/djvf2vnbp/image/upload/v1705931074/uiklxu67hsbgb8zfqlup.png'
                        alt='borrar comentario'
                    />
                </button>
            </Tooltip>
            <Tooltip title="Comentario">
                <button className='absolute bottom-1.5 right-1.5 border-none bg-transparent w-min h-8 rounded-xl pt-0.5 pr-1 pb-1 pl-0.5 hover:bg-blue-500 hover:shadow hover:shadow-blue-500 hover:cursor-pointer hover:border hover:border-solid hover:border-black' onClick={submitComment}>
                    <img
                        className='h-8'
                        src='https://res.cloudinary.com/djvf2vnbp/image/upload/v1705931375/imqkdk9ugc1cmtdg6anj.png'
                        alt='publicar comentario'
                    />
                </button>
            </Tooltip>
        </form>
    );

    return (
        <div className='w-full'>
            <LikeDisplay
                likes={post.likes}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
            <div className='flex flex-col items-center w-full mt-6 bg-blue-400 rounded-2xl shadow shadow-gray-300'>
                <div className='flex justify-center w-full bg-white rounded-tr-2xl shadow shadow-blue-300'>
                    <div className='flex items-center w-full my-4 mx-0 rounded-tr-2xl'>
                        <UserIcon user={post.author} />
                        <p className='text-sm text-gray-500 -ml-1.5'>publicado en {humanDate}</p>
                    </div>
                </div>

                <div className='w-full bg-transparent'>
                    <p className='font-semibold text-gray-400'>{post.text}</p>
                    <hr className='m-0' />
                    <div className='flex justify-between text-gray-600'>
                        <button
                            className='pt2.5 border-none bg-transparent text-base my-4 mx-0 hover:underline hover:decoration-blue-500 hover:cursor-pointer'
                            onClick={() => setModalIsOpen(true)}
                        >
                            {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                        </button>
                        <button className='pt2.5 border-none bg-transparent text-base my-4 mx-0 hover:underline hover:decoration-blue-500 hover:cursor-pointer' onClick={commentLinkClick}>
                            {post.comments.length}{'    '}
                            {post.comments.length === 1 ? 'Comentario' : 'Comentarios'}
                        </button>
                    </div>
                </div>
                <div className='flex justify-between w-full bg-white rounded-bl-xl shadow shadow-blue-400'>
                    <button className='border-2 border-solid border-blue-500 w-2/4 text-lg font-bold py-1.5 px-0 bg-transparent h-9 transition-all duration-500 rounded-bl-2xl hover:bg-blue-500 hover:border-gray-400 hover:cursor-pointer' onClick={like}>
                        Like
                    </button>

                    <button className='border-2 border-solid border-blue-500 w-2/4 text-lg font-bold py-1.5 px-0 bg-transparent h-9 transition-all duration-500 rounded-br-2xl hover:bg-blue-500 hover:border-gray-400 hover:cursor-pointer' onClick={() => setComment('')}>
                        Comentar
                    </button>
                </div>
                {comment !== null && commentForm}
                {showComments && (
                    <div className='w-full flex flex-col'>
                        {post.comments.map((comment, index) => (
                            <Comment
                                comment={post.comments[post.comments.length - 1 - index]}
                                key={post.comments[post.comments.length - 1 - index]._id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Post;