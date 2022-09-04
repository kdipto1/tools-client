import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const ManageOrder = () => {
  const [user, loading, error] = useAuthState(auth);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(
    ["allOrder"],
    async () =>
      await fetch("http://localhost:5000/orders", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );
  if (loading || isLoading) {
    return;
  }
  const handleShipping = async (id) => {
    const shipping = "shipped";
    try {
      const { data } = await axios.put(
        `http://localhost:5000/orders/${id}`,
        {
          shipping: shipping,
        },
        {
          headers: {
            authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      );
      console.log(data);
      if (data) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>Manage orders:{orders?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Orderer Email</th>
              <th>Payment status</th>
              <th>Delivery</th>
              <th>Shipping status</th>
            </tr>
          </thead>
          {orders.map((order, index) => {
            return (
              <tbody key={order?._id}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{order?.product}</td>
                  <td>{order?.email}</td>
                  <td>
                    {order?.status === "paid" && "Paid"}
                    {order?.status === "pending" && "Unpaid"}
                  </td>
                  <td>
                    {order?.status === "paid" && (
                      <button
                        onClick={() => handleShipping(order._id)}
                        className="btn btn-xs"
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                  <td>{order?.shipping}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </section>
  );
};

export default ManageOrder;
