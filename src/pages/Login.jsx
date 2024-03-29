import { useState } from "react";
import LoginForm from '../components/LoginForm';

function LogIn() {
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [slideUp, setSlideUp] = useState(false);

    const handleButtonClick = () => {
        setSlideUp(true);
        setTimeout(() => {
            setShowSignUpForm(true);
        }, '500');
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-tr from-slate-400 to-azul">
            <div>
                {showSignUpForm ? (
                    <LoginForm />
                ) : (
                    <button
                        className={`text-6xl py-14 px-5 bg-transparent transition-all duration-500 hover:bg-azul_claro hover:rounded-[50%] ${slideUp ? "-translate-y-full transition-transform ease-in-out duration-500" : ''}`}
                        onClick={handleButtonClick}
                    >
                        <h1>OdinBook</h1>
                    </button>
                )}
            </div>
        </div>
    );
}

export default LogIn;