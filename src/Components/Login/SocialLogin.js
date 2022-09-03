import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';

const SocialLogin = () => {
  const [user1, loading1] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (loading1) {
      return;
    }
    if (user || user1) {
      toast.success("Login Successful");
      // console.log(user1);
      const url = "http://localhost:5000/login";
      axios
        .post(url, { email: user?.email })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("email", user1?.email);
          // console.log(data);
          navigate(from, { replace: true });
        })
        .catch(function (error) {
          toast.error(error.message);
          console.log(error);
        });
    }
    if (loading) {
      return;
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [from, user, navigate, error, loading,loading1,user1]);
  return (
    <div>
      <button
        onClick={() => signInWithGoogle()}
        className="btn  btn-primary w-full max-w-xs text-white"
      >
        {" "}
        Continue With google
      </button>
    </div>
  );
};

export default SocialLogin;