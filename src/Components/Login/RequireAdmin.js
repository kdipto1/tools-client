import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../Hooks/useAdmin";

const RequireAdmin = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  let location = useLocation();
  if (loading || adminLoading) {
    return;
  }
  if (!user || !admin) {
    signOut(auth);
    return (
      <Navigate
        toast={toast("You are not admin")}
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};

export default RequireAdmin;
