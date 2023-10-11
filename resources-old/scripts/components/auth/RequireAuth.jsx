import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import Loading from "../Loading.jsx"
import Unauthorized from '../../pages/errors/Unauthorized.jsx';

const RequireAuth = ({ Protected, component: Component, ...props }) => {
  const { loading, UserLevel } = useContext(AuthContext);
  const location = useLocation(); 

  if(UserLevel > 0) {
    return <Navigate to="/" />;
  }
  if (UserLevel && (location.pathname === '/auth/login' || location.pathname === '/auth/register')) {
    return <Navigate to="/" />;
  }
  
  if (!UserLevel && (location.pathname === '/auth/login' || location.pathname === '/auth/register')) {
    return <Component {...props} />;
  }

  return (loading ? <Loading /> :
    Protected && !UserLevel ? <Navigate to="/auth/login" /> :
      UserLevel >= Protected ? (
        <Component {...props} />
      ) : (

        <Unauthorized />
      )

  );
};

export default RequireAuth;
