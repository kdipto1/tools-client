import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const MakeAdmin = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["getAdmins"], () =>
    fetch("https://audiobee.onrender.com/makeAdmin", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  const makeAdmin = async (id) => {
    const role = "admin";
    const url = `https://audiobee.onrender.com/makeAdmin/${id}`;
    try {
      const { data } = await axios.post(
        url,
        { role: role },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (data) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>Make admin:{users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          {users?.map((user, index) => {
            return (
              <tbody key={user._id}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>
                    {user.role === "user" && (
                      <button
                        onClick={() => makeAdmin(user._id)}
                        className="btn btn-xs"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </section>
  );
};

export default MakeAdmin;
