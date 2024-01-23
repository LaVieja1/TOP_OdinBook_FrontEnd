/* eslint-disable react/prop-types */
import formatTimeDifference from '../utils/formatDate';

function Comment({ comment }) {
    const time = formatTimeDifference(comment.time);

    return (
        <div className='flex items-center py-2.5 pr-2.5 pl-5 w-[90%] justify-start'>
            <button className='p-0 border-none bg-transparent rounded-[50%]'>
                <img
                    className='h-10 w-10 object-cover rounded-[50%]'
                    src={comment.author.profilePhoto}
                    alt='user foto'
                />
            </button>
            <div className='pl-2 w-full'>
                <div className='flex flex-col pt-2.5 pr-0 pb-1.5 pl-2.5 rounded-2xl bg-crema'>
                    <a
                        className='no-underline text-black font-bold'
                        href={`/users/${comment.author._id}`}
                    >
                        {comment.author.username}
                    </a>
                    <p className='mt-0.5 mr-2 mb-1.5 ml-0'>{comment.text}</p>
                </div>
                <div className='flex pl-2.5'>
                    <p className='my-0 mr-2.5 ml-0 text-sm text-gris'>{time}</p>
                    <button className='text-sm text-gris bg-transparent border-none p-0 h-min font-semibold hover:text-azul hover:cursor-pointer hover:underline hover:decoration-black'>Like   </button>
                </div>
            </div>
        </div>
    );
}

export default Comment;