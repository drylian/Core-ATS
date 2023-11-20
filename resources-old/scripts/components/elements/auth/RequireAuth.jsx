import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Unauthorized from '../../../pages/errors/Unauthorized.jsx';
import { store } from '../../../../states/index.js';
import Suspended from '../../../../../resources/pages/errors/Suspended.jsx';

const RequireAuth = ({ Protected = 0, component: Component, ...props }) => {
    const location = useLocation();

    const user = store.getState().user.data

    /**
     * Se existir user.username
     */

    if (user && user.username && (user.suspended === true || user.suspendedReason)) {
        return <Suspended reason={user.suspendedReason} />
    }

    if (user && user.username && (location.pathname === '/auth/login' || location.pathname === '/auth/register')) {
        return <Navigate to="/" />;
    }

     /**
     * Se existir user.username
     */
    if (!user && (location.pathname === '/auth/login' || location.pathname === '/auth/register')) {
        return <Component {...props} />;
    }

    return (
        user.permissions >= Protected ? (
            <Component {...props} />
        ) : (
            <Unauthorized />
        )
    );
};

export default RequireAuth;
