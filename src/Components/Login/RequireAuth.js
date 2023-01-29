import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';

const RequireAuth = ({children}) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return;
  }
  if (!user)
    return (
      <Navigate
        toast={toast("You need to login to visit this page",{duration:180})}
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  return children;
};

export default RequireAuth;