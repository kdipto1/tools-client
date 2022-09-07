import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { InfinitySpin } from "react-loader-spinner";
import { NavLink, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  if (loading && adminLoading) {
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  return (
    <section className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <!-- Page content here --> */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Dashboard
        </label>
        <h2 className="text-2xl font-bold text-green-500">
          Welcome to your Dashboard
        </h2>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content font-bold">
          {/* <!-- Sidebar content here --> */}
          {!admin && (
            <li className="my-2">
              <NavLink to="/dashboard/myOrders">My Orders</NavLink>
            </li>
          )}
          {!admin && (
            <li className="mb-2">
              <NavLink to="/dashboard/addReview">Add Review</NavLink>
            </li>
          )}
          <li className="mb-2">
            <NavLink to="/dashboard/myProfile">My Profile</NavLink>
          </li>
          {admin && (
            <li className="mb-2">
              <NavLink to="/dashboard/addProduct">Add Product</NavLink>
            </li>
          )}
          {admin && (
            <li className="mb-2">
              <NavLink to="/dashboard/manageProducts">Manage Products</NavLink>
            </li>
          )}
          {admin && (
            <li className="mb-2">
              <NavLink to="/dashboard/manageOrders">Manage Orders</NavLink>
            </li>
          )}
          {admin && (
            <li>
              <NavLink to="/dashboard/makeAdmin">Make Admin</NavLink>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
