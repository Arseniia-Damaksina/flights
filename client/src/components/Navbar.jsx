import './Navbar.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import getCookieValue from '../utils/getCookieValue';
import { useActiveState } from '../ActiveStateContext';

const Navbar = () => {
    const {
        loginActive,
        setLoginActive,
        registerActive,
        setRegisterActive,
        addFlightActive,
        setAddFlightActive,
        editFlightActive,
        setEditFlightActive
      } = useActiveState();
      

    const handleLogout = async () => {
        try {
            const user_id = getCookieValue('id');
            if (user_id) {
                const response = await axios.get(
                    'http://localhost:5002/logout',
                    {
                        withCredentials: true
                    }
                );
                console.log(response);
                if (response.status === 200) {
                    console.log('Logged out successfully');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="navbar">
            <FontAwesomeIcon
                icon={faUser}
                style={{
                    color: '#ffffff',
                    fontSize: '40px',
                    margin: '10px'
                }}
                onClick={() => {
                    setLoginActive(!loginActive);
                    setAddFlightActive(loginActive);
                }}
            />

            <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{
                    color: '#ffffff',
                    fontSize: '40px',
                    margin: '10px'
                }}
                onClick={handleLogout}
            />
        </div>
    );
};

export default Navbar;
