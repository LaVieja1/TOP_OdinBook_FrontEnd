/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Settings() {
    const [showForm, setShowForm] = useState(false);
    const [updateLocalUser, setUpdateLocalUser] = useState(false);
    const [disablePicSubmitBtn, setDisablePicSubmitBtn] = useState(false);
    const [disableBioBtn, setDisableBioBtn] = useState(false);
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [bio, setBio] = useState('');
    const navigate = useNavigate();
    const token = Cookies.get('jwt_token');
    const id = Cookies.get('user_id');
    const [updateUser, setUpdateUser] = useOutletContext();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(
                'http://localhost:3000/users/' + id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                }
            );
            const data = await response.json();
            setUser(data);
            setBio(data.bio);
            setUpdateLocalUser(false);
        };
        fetchUser();
    }, [updateLocalUser]);

    // img functions
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    };

    const onFileChange = (e) => {
        const newFile = e.target.files[0];

        if (newFile.size > 500000) {
            alert('500kb max');
            e.target.value = null;
            return;
        }

        setFile(newFile);
    };

    const handleSubmit = async (e) => {
        setDisablePicSubmitBtn(true);
        e.preventDefault();

        if (!file) {
            console.error('No hay archivo');
            return;
        }

        const base64 = await convertBase64(file);
        const body = { image: base64 };

        try {
            const response = await fetch(
                'http://localhost:3000/users/' + id + '/profilepic',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    method: 'POST',
                    body: JSON.stringify(body)
                }
            );
            setDisablePicSubmitBtn(false);
        } catch (err) {
            console.error(err);
            return;
        }
        setUpdateLocalUser(true);
        setShowForm(false);
        // update pic in nav
        setUpdateUser(true);
    };

    const bioChange = (e) => {
        setBio(e.target.value);
    };

    const bioSubmit = async (e) => {
        e.preventDefault();
        setDisableBioBtn(true);

        const body = {
            text: bio
        };

        e.preventDefault();

        try {
            await fetch(
                'http://localhost:3000/users/' + id + '/bio',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(body)
                }
            );
            setDisableBioBtn(false);
        } catch (err) {
            console.error(err);
            return;
        }
        setUpdateLocalUser(true);
    };

    if (!token || token == 'undefined' || token == null) {
        navigate('/login');
    }

    return (
        <>
            <div className="ml-[5vw] mr-[5vw] text-black">
                <h2 className="text-3xl font-bold mb-12 mt-6">Opciones</h2>
                {user && (
                    <div>
                        <h3 className="text-2xl font-bold mb-5">Foto de perfil</h3>
                        <div className="flex items-center mb-5">
                            <img
                                src={user.profilePhoto}
                                alt="Foto de perfil"
                                className="h-40 w-40 object-cover bg-transparent rounded-[50%] border-2 border-azul border-solid"
                            />

                            <button
                                className="flex items-center ml-5 h-10 px-3 text-lg font-bold rounded-2xl bg-azul hover:shadow-[0_0_10px_#9381FF] hover:cursor-pointer"
                                onClick={() => {
                                    showForm ? setShowForm(false) : setShowForm(true);
                                }}
                            >
                                Cambiar
                            </button>
                        </div>

                        <div
                            className={
                                showForm ? 'flex' : 'hidden'
                            }
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="p-5 bg-crema rounded-xl flex justify-start"
                                encType="multipart/form-data"
                            >
                                <input
                                    type="file"
                                    name="profPicSelect"
                                    id="profPicSelect"
                                    onChange={onFileChange}
                                    className="p-1 text-sm border-none"
                                />
                                <button
                                    className="rounded-3xl bg-azul font-bold p-2 border-none text-lg w-28 hover:shadow-[0_0_10px_#9381FF] hover:cursor-pointer"
                                    disabled={disablePicSubmitBtn}
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="mt-7 relative flex flex-col w-full h-fit max-w-2xl">
                    <h3 className="text-2xl font-bold">Sobre mi</h3>
                    <form className="flex flex-col relative mt-5" onSubmit={bioSubmit}>
                        <textarea
                            onChange={bioChange}
                            className="h-32 rounded-2xl resize-none p-3 border-none text-lg bg-crema"
                            style={{ width: 'calc(100% - 24px)' }}
                            name="updateBio"
                            id="updateBio"
                            value={bio}
                            placeholder={
                                bio == '' || bio == undefined
                                    ? 'Escribe algo sobre ti!'
                                    : null
                            }
                        ></textarea>
                        <button className="mt-5 relative bg-azul rounded-2xl text-lg font-bold py-2 px-4 border-none w-fit transition-all duration-500 hover:scale-110" disabled={disableBioBtn}>
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Settings;