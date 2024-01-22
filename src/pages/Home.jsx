import Timeline from '../components/Timeline';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Home () {
    const userId = Cookies.get('user_id');

    const token = Cookies.get('jwt_token');
    const navigate = useNavigate();

    if (!token || token == 'undefined' || token == null) {
        navigate('/login');
    }

    return <Timeline id={userId} />
}

export default Home;