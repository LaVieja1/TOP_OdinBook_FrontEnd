/* eslint-disable react/prop-types */
import UserIcon from "./UserIcon";
import Modal from 'react-modal';
import { useState } from "react";
import Cookies from "js-cookie";

function FriendRequests({
    friendModalIsOpen,
    setFriendModalIsOpen,
    friendRequests,
    setUpdateUser,
    id
}) {
    const token = Cookies.get('jwt_token');
    const [disableBtn, setDisableBtn] = useState(false);
    const closeModal = () => {
        setFriendModalIsOpen(false);
    };

    const customStyles = {
        content: {
            height: 'min-content',
            width: '375px',
            position: 'flex',
            margin: '40px 5px 0 auto',
            borderRadius: '15px',
            padding: '15px'
        }
    };

    const decline = async (e) => {
        setDisableBtn(true);
        const requestId = e.target.value;
        const response = await fetch(
            'http://localhost:3000/users/' + id + '/friendrequests/' + requestId + '/decline', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );

        if (!response.ok) {
            console.error('Error operando la solicitud de amistad');
            return;
        }
        setDisableBtn(false);
        setUpdateUser(true);
    };

    const accept = async (e) => {
        setDisableBtn(true);
        const requestId = e.target.value;
        const response = await fetch (
            'http://localhost:3000/users/' + id + '/friendrequests/' + requestId + '/accept', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );

        if (!response.ok) {
            console.error('Error operando la solicitud de amistad');
            return;
        }
        setDisableBtn(false);
        setUpdateUser(true);
    };

    return (
        <Modal
            isOpen={friendModalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={customStyles}
        >
            {friendRequests && friendRequests.length > 0 ? (
                <div className="max-sm:text-black">
                    <h3 className="my-1 mx-0 text-black font-bold">Solicitudes de amistad</h3>
                    <hr />
                    {friendRequests.map((request) => {
                        return (
                            <div
                                className="my-2 -m-1 flex justify-between items-center"
                                key={`request${request._id}`}
                            >
                                <UserIcon user={request} />
                                <div className="min-w-40">
                                    <button
                                        disabled={disableBtn}
                                        value={request._id}
                                        className="text-base rounded p-1 cursor-pointer text-white bg-azul hover:shadow-[0_0_15px_pink] hover:text-black"
                                        onClick={accept}
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        disabled={disableBtn}
                                        value={request._id}
                                        className="text-base rounded p-1 cursor-pointer bg-transparent ml-1 hover:border-red-700 hover:bg-rosa hover:text-white"
                                        onClick={decline}
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <h3 className="my-1 mx-0">Solicitudes de amistad</h3>
                    <h3 />
                    <p>No hay solicitdes de amistad</p>
                </div>
            )}
        </Modal>
    );
}

export default FriendRequests;