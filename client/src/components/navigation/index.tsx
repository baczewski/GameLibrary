import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../context/user-context';
import { authService } from '../../services/auth-service';
import styles from './navigation.module.css';

export function Navigation() {
    const user = useCurrentUser();

    return (
        <nav className={styles.navigation}>
            <div>
                <Link to={'/'}>
                    <img id={styles.logo} src="https://store.akamai.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" alt="Steam logo" />
                </Link>
            </div>
            <ul>
                <li><Link to={'/games'}>Store</Link></li>

                {user ? <li><Link to={'/games/create'}>Create Game</Link></li> :
                    <li><Link to={'/community'}>Community</Link></li>}

                {!user ? <li><Link to={'/user/register'}>Register</Link></li> :
                    <li><Link to={'/profile'}>Profile</Link></li>}

                {!user ? <li><Link to={'/user/login'}>Login</Link></li> :
                    <li onClick={() => authService.logout()}>Logout</li>}
            </ul>
        </nav>
    )
}