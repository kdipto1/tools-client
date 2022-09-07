import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const SocialLogin = () => {
  const [user1, loading1] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  /* +++++++++++++++++++++++++++++++ */
  if (loading1 && loading) {
    return;
  }
  if (user1) {
    const googleLogin = async () => {
      toast.success("Login Successful");
      // console.log(user1);
      const url = "http://localhost:5000/login";
      await axios
        .post(url, { email: user1?.email })
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
      const email = user1?.email;
      const name = user1?.displayName;
      const role = "user";
      const url1 = `http://localhost:5000/users/${email}`;
      await axios
        .post(url1, { name: name, email: email, role: role })
        .then((response) => {
          const { data } = response;
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    googleLogin();
  }
  if (error) {
    toast.error(error?.message);
  }
  /* +++++++++++++++++++++++++++++++++++++ */

  return (
    <section>
      <button
        onClick={() => signInWithGoogle()}
        className="btn  btn-primary w-full max-w-xs text-white"
      >
        {" "}
        Continue With google
      </button>
    </section>
  );
};

export default SocialLogin;
