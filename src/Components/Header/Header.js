import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsPersonCircle } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

import auth from "../../firebase.init";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return;
  }
  const menuItems = (
    <>
      <li className="">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="lg:ml-4">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="lg:ml-4">
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
      <li className="lg:ml-4">
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      {/* <li className="lg:ml-4">
        <NavLink to="/portfolio">Portfolio</NavLink>
      </li> */}
    </>
  );
  // console.log(user);
  return (
    <div className="navbar bg-base-100 font-bold">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case font-bold text-xl">
          AudioBee
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost rounded-btn">
              <BsPersonCircle className="text-4xl mr-1" />
              {user && user.displayName}
            </label>
            <ul
              tabIndex="0"
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    signOut(
                      auth,
                      localStorage.removeItem("accessToken"),
                      localStorage.removeItem("email")
                    )
                  }
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <label tabIndex="0" className="btn btn-ghost rounded-btn">
            <NavLink to="/login">Login</NavLink>
          </label>
        )}
      </div>
    </div>
  );
};

export default Header;
