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
                            className="h-12 w-12 object-cover bg-transparent rounded-r-3xl hover:shadow-lg hover:shadow-blue-600"
                            alt="user avatar"
                        />
                    </Link>
                </Tooltip>

                <Link className="no-underline text-black font-bold text-xl p-1 mr-2 ml-2 text-left hover:underline hover:decoration-blue-600 hover:underline-offset-4" to={`/users/${user._id}`}>
                    {user.username}
                </Link>
            </button>
        </div>
    );
}

export default UserIcon;