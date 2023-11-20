import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Unauthorized from '../../../pages/errors/Unauthorized';
import Suspended from '../../../pages/errors/Suspended';
import { store } from '../../../states';

interface RequireAuthProps {
    Protected?: number;
    component: React.ComponentType<any>;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ Protected = 0, component: Component, ...props }) => {
    const location = useLocation();

    const user = store.getState().user.data;

    /**
     * Se existir user.username
     */

    if (user?.username && (user.suspended === true || user.suspendedReason)) {
        return <Suspended reason={user.suspendedReason} />;
    }

    if (user?.username && (location.pathname === '/auth/login' || location.pathname === '/auth/register')) {
        return <Navigate to="/" />;
    }

    /**
     * Se existir user.username
     */
    if (!user && (location.pathname === '/auth/login' || location.pathname === '/auth/register')) {
        return <Component {...props} />;
    }

    return user && user.permissions && user.permissions >= Protected ? <Component {...props} /> : <Unauthorized />;
};

export default RequireAuth;
