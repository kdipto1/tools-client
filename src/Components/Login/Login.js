import axios from "axios";
import React, { useEffect, useRef } from "react";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);
  const emailRef = useRef("");
  const [user1, loading1, error1] = useAuthState(auth);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (loading || loading1) {
      return;
    }
    if (error || error1) {
      toast(error?.message || error1?.message);
    }
    if (user || user1) {
      const url = "http://localhost:5000/login";
      axios
        .post(url, { email: user1?.email })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("accessToken", data.token);
          console.log(data);
          navigate(from, { replace: true });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [error, from, loading, user, navigate, error1, user1, loading1]);
  const onSubmit = async (data) => {
    // console.log(data);
    await signInWithEmailAndPassword(data?.email, data?.password);
  };
  const resetPassword = async () => {
    const email = emailRef?.current?.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("please enter your email address");
    }
  };
  return (
    <section className="h-screen container mx-auto my-auto">
      <div class="card bg-base-100 w-96 mx-auto shadow-xl image-full">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div class="card-body mx-auto">
          <h2 class="card-title text-center inline-block">Please Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              ref={emailRef}
              placeholder="Your email"
              className="input input-bordered input-secondary w-full max-w-xs"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please input your email",
                },
              })}
            />
            <label className="label">
              {errors?.email?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors?.email.message}
                </span>
              )}
            </label>
            {/* ++++++++++++++++++++++ */}
            <input
              type="password"
              placeholder="Your password"
              className="input input-bordered input-secondary w-full max-w-xs"
              {...register("password", {
                required: {
                  value: true,
                  message: "Please input password",
                },
                minLength: {
                  value: 6,
                  message: "Password should be more than 6 character",
                },
              })}
            />
            <label className="label">
              {errors?.password?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors?.password.message}
                </span>
              )}
              {errors?.password?.type === "minLength" && (
                <span className="label-text-alt text-red-500">
                  {errors?.password.message}
                </span>
              )}
            </label>
            <input
              className="btn btn-secondary w-full max-w-xs text-white"
              type="submit"
              value="Login"
            />
          </form>
          <p>
            Don't have an account, Please{" "}
            <Link className="text-blue-600" to="/register">
              Register
            </Link>{" "}
          </p>
          <div className="mx-auto divider">OR</div>
          <SocialLogin className="btn  btn-primary w-full max-w-xs text-white" />
        </div>
      </div>
    </section>
  );
};

export default Login;
