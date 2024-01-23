/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Tooltip } from '@mui/material';
import '@emotion/styled';

function UserIcon (props) {
    const { user } = props;

    return (
        <div>
            <button className="flex h-12 bg-transparent border-none items-center">
                <Tooltip title="Perfil">
                    <Link to={'/users/' + user._id}>
                        <img
                            src={user.profilePhoto}
                            className="h-12 w-12 object-cover bg-transparent rounded-[50%] hover:shadow-[0_0_10px_#9381FF] max-sm:h-10 max-sm:w-10"
                            alt="user avatar"
                        />
                    </Link>
                </Tooltip>

                <Link className="no-underline text-black font-bold text-xl p-1 mr-2 ml-2 text-left hover:underline hover:decoration-azul hover:underline-offset-4 max-sm:text-xs max-sm:mx-0" to={`/users/${user._id}`}>
                    {user.username}
                </Link>
            </button>
        </div>
    );
}

export default UserIcon;