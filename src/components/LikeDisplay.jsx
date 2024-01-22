/* eslint-disable react/prop-types */
import UserIcon from './UserIcon';
import Modal from 'react-modal';

function LikeDisplay ({ likes, modalIsOpen, setModalIsOpen }) {
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const customStyles = {
        content: {
            height: 'min-content',
            width: '350px',
            position: 'absolute',
            margin: '40px auto 0 auto',
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={customStyles}
        >
            <div>
                <header className='flex justify-between items-center h-min mb-1.5'>
                    <h3 className='m-0 text-black text-xl font-bold'>Likes</h3>
                    <button className='text-black text-lg font-bold border-none rounded-full h-7 w-7 text-center hover:bg-azul hover:cursor-pointer' onClick={closeModal}>
                        X
                    </button>
                </header>
                <hr className='my-2.5 mx-0'/>
                <div>
                    {likes.map((like) => (
                        <div className='my-2.5 mx-0' key={like._id}>
                            <UserIcon user={like} />
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default LikeDisplay;