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
        .replace(/,/, ', a las');

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
        <form className='relative w-[98%] my-2 mx-0 flex flex-col'>
            <textarea
                onChange={handleChange}
                value={comment}
                className='border-none resize-none min-h-16 rounded-[15px_15px_15px_15px] mb-0.5 py-3 pr-10 pl-3 bg-crema text-black placeholder:text-black'
                name='commentText'
                id='commentText'
                placeholder='Escribir un comentario...'
            ></textarea>
            <Tooltip title='Cerrar/borrar'>
                <button
                    className='absolute top-1.5 right-1.5 border-none bg-transparent w-fit h-6 p-0.5 rounded hover:bg-rosa hover:cursor-pointer'
                    onClick={() => setComment(null)}
                >
                    <img
                        className='h-5'
                        src='/trash.svg'
                        //src='https://res.cloudinary.com/djvf2vnbp/image/upload/v1705931074/uiklxu67hsbgb8zfqlup.png'
                        alt='borrar comentario'
                    />
                </button>
            </Tooltip>
            <Tooltip title="Comentario">
                <button className='absolute bottom-1.5 right-1.5 border-none bg-transparent w-fit h-8 rounded-xl pt-0.5 pr-1 pb-1 pl-0.5 hover:bg-azul hover:cursor-pointer' onClick={submitComment}>
                    <img
                        className='h-8'
                        src='/send-2.svg'
                        //src='https://res.cloudinary.com/djvf2vnbp/image/upload/v1705931375/imqkdk9ugc1cmtdg6anj.png'
                        alt='publicar comentario'
                    />
                </button>
            </Tooltip>
        </form>
    );

    return (
        <div className='w-[95%]'>
            <LikeDisplay
                likes={post.likes}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
            <div className='flex flex-col items-center w-full mt-6 bg-azul_claro rounded-2xl shadow-[0_0_0_2px_#f8717145]'>
                <div className='flex justify-center w-full bg-white rounded-[15px_15px_0_0] shadow-[0_0_0_2px_#f8717145]'>
                    <div className='flex items-center w-[92.5%] my-4 mx-0 rounded-[15px_15px_0_0]'>
                        <UserIcon user={post.author} />
                        <p className='text-sm text-gris -ml-1.5'>publicado en {humanDate}</p>
                    </div>
                </div>

                <div className='w-[92.5%] bg-transparent mt-2'>
                    <p className='font-semibold text-gris py-1'>{post.text}</p>
                    <hr className='m-0' />
                    <div className='flex justify-between text-gris font-semibold'>
                        <button
                            className='pt2.5 border-none bg-transparent text-base my-4 mx-0 hover:underline hover:decoration-azul hover:cursor-pointer'
                            onClick={() => setModalIsOpen(true)}
                        >
                            {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                        </button>
                        <button className='pt2.5 border-none bg-transparent text-base my-4 mx-0 hover:underline hover:decoration-azul hover:cursor-pointer' onClick={commentLinkClick}>
                            {post.comments.length}{'    '}
                            {post.comments.length === 1 ? 'Comentario' : 'Comentarios'}
                        </button>
                    </div>
                </div>
                <div className='flex justify-between w-full bg-white rounded-[0_0_20px_20px] shadow-[0_0_0_2px_pink]'>
                    <button className='border-2 border-solid border-pink w-2/4 text-lg font-bold py-1.5 px-0 bg-transparent h-9 transition-all duration-500 rounded-bl-2xl hover:bg-azul hover:border-gris hover:cursor-pointer' onClick={like}>
                        Like
                    </button>

                    <button className='border-2 border-solid border-pink w-2/4 text-lg font-bold py-1.5 px-0 bg-transparent h-9 transition-all duration-500 rounded-br-2xl hover:bg-azul hover:border-gris hover:cursor-pointer' onClick={() => setComment('')}>
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