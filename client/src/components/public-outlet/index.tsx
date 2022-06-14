import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../context/user-context';

function NavigateToHome() {
    const location = useLocation();

    return <Navigate to={'/games'} state={{ location: location.pathname }} />;
}

export function PublicOutlet() {
    const user = useCurrentUser();

    return user ? <NavigateToHome /> : <Outlet />
}