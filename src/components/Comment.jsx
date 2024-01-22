/* eslint-disable react/prop-types */
import formatTimeDifference from '../utils/formatDate';

function Comment({ comment }) {
    const time = formatTimeDifference(comment.time);

    return (
        <div className='flex items-start py-2.5 pr-2.5 pl-5 w-full justify-center'>
            <button className='p-0 border-none bg-transparent rounded-full'>
                <img
                    className='h-10 w-10 object-cover rounded-full'
                    src={comment.author.profilePhoto}
                    alt='user foto'
                />
            </button>
            <div className='pl-2'>
                <div className='flex flex-col pt-2.5 pr-0 pb-1.5 pl-2.5 rounded-2xl bg-red-400'>
                    <a
                        className='no-underline text-black font-bold'
                        href={`/users/${comment.author._id}`}
                    >
                        {comment.author.username}
                    </a>
                    <p className='mt-0.5 mr-2 mb-1.5 ml-0'>{comment.text}</p>
                </div>
                <div className='flex pl-2.5'>
                    <p className='my-0 mr-2.5 ml-0 text-sm text-gray-500'>{time}</p>
                    <button className='text-sm text-gray-500 bg-transparent border-none p-0 h-min font-semibold hover:text-blue-500 hover:cursor-pointer hover:underline hover:decoration-black'>Like   </button>
                </div>
            </div>
        </div>
    );
}

export default Comment;