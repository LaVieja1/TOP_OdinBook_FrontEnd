/* eslint-disable no-undef */
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginForm() {
    const [preexistingUser, setPreexistingUser] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'https://top-odinbook-api.onrender.com/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                }
            );
            const data = await response.json();

            if (response.ok) {
                // Store JWT token in cookies
                Cookies.set('jwt-token', data.token, { sameSite: 'strict', secure: true });
                Cookies.set('user_id', data.userId, { sameSite: 'strict', secure: true });
                navigate('/home');
                return;
            } else {
                setError(data.msg);
                console.error('Autenticación fallida');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const guestSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'https://top-odinbook-api.onrender.com/login/guest',
                {
                    method: 'POST'
                }
            );
            const data = await response.json();

            if (response.ok) {
                // Store JWT Token in cookies
                Cookies.set('jwt_token', data.token, {sameSite: 'strict', secure: true}  );
                Cookies.set('user_id', data.userId, {sameSite: 'strict', secure: true}  );
                navigate('/home');
                return;
            } else {
                setError(data.msg);
                console.error('Autenticación fallida')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                username: username,
                password: password,
                confirm_password: passwordConfirm,
            };
            const response = await fetch (
                'https://top-odinbook-api.onrender.com/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                }
            );
            const data = await response.json();

            if (response.ok) {
                // StoreJWT token in cookies
                Cookies.set('jwt_token', data.token, {sameSite: 'strict', secure: true}  );
                Cookies.set('user_id', data.userId, {sameSite: 'strict', secure: true}  );
                navigate('/home');
                return;
            } else {
                setError(data.msg);
                console.error('Autenticación fallida');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (preexistingUser) {
        return (
            <div className="w-80">
                <h1 className="text-center text-4xl">OdinBook</h1>
                <form onSubmit={handleLoginSubmit} className="flex flex-col">
                    <div className="flex flex-col my-1 rounded-2xl font-bold">
                        {'  '}
                        <label className="my-1 rounded-2xl font-bold">
                            Usuario
                            <input
                                name="username"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                className="font-bold w-full py-3 px-2 my-2 mx-0 inline-block border-2 border-solid border-gris box-border rounded-2xl text-sm text-black"
                            />
                        </label>
                    </div>

                    <div className="flex flex-col my-1 rounded-2xl font-bold">
                        {'  '}
                        <label className="my-1 rounded-2xl font-bold">
                            Contraseña
                            <input
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="font-bold w-full py-3 px-2 my-2 mx-0 inline-block border-2 border-solid border-gris box-border rounded-2xl text-sm text-black"
                            />
                        </label>
                    </div>

                    <button className="bg-transparent rounded-2xl transition-all duration-500 hover:bg-azul_claro h-10" type="submit">
                        Iniciar sesión
                    </button>
                    <hr />
                    <button className="bg-transparent rounded-2xl transition-all duration-500 hover:bg-azul_claro h-10" onClick={guestSignIn}>
                        Iniciar sesión como invitado
                    </button>
                    <button className="bg-transparent rounded-2xl transition-all duration-500 hover:bg-azul_claro h-10" onClick={() => setPreexistingUser(false)}>
                        Registrarse
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="w-80">
                <h1 className="text-center text-4xl">OdinBook</h1>
                <form onSubmit={handleSignupSubmit} className="flex flex-col">
                    <div className="flex flex-col my-1 rounded-2xl font-bold">
                        {'  '}
                        <label className="my-1 rounded-2xl font-bold">
                                Usuario
                                <input
                                    name="username"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    className="font-bold w-full py-3 px-2 my-2 mx-0 inline-block border-2 border-solid border-gray-500 box-border rounded-2xl text-sm text-black"
                                />
                        </label>
                    </div>

                    <div className="flex flex-col my-1 rounded-2xl font-bold">
                            {'  '}
                            <label className="my-1 rounded-2xl font-bold">
                                Contraseña
                                <input
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="font-bold w-full py-3 px-2 my-2 mx-0 inline-block border-2 border-solid border-gray-500 box-border rounded-2xl text-sm text-black"
                                />
                            </label>
                    </div>

                    <div className="flex flex-col my-1 rounded-2xl font-bold">
                            {'  '}
                            <label className="my-1 rounded-2xl font-bold">
                                Confirmar contraseña
                                <input
                                    name="Confirmpassword"
                                    type="password"
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    value={passwordConfirm}
                                    className="font-bold w-full py-3 px-2 my-2 mx-0 inline-block border-2 border-solid border-gray-500 box-border rounded-2xl text-sm text-black"
                                />
                            </label>
                    </div>

                    <p className="text-xs text-center mb-2">La contraseña debe tener 8 caractéres minimo, una miníscula, una mayúscula y un numero</p>

                    <button className="bg-transparent rounded-2xl hover:bg-azul h-10" type="submit">
                        Registrarse
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;