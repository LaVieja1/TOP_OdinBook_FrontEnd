import { useState } from "react";
import LoginForm from './LoginForm';

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
        <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-tr from-slate-400 to-blue-600">
            <div>
                {showSignUpForm ? (
                    <LoginForm />
                ) : (
                    <button
                        className={`py-14 px-5 bg-transparent transition-all duration-1000 hover:bg-blue-400 hover:rounded-2xl ${slideUp ? "-translate-y-full transition-transform ease-in-out duration-500" : ''}`}
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