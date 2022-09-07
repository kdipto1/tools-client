import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const MyOrders = () => {
  const [user, loading, error] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [cancel, setCancel] = useState();
  useEffect(() => {
    if (loading) {
      return;
    }
    const getMyOrders = async () => {
      const email = user?.email;
      const url = `http://localhost:5000/userOrders?email=${email}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    getMyOrders();
  }, [loading, user?.email, cancel]);
  const handleDelete = async (id) => {
    const url = `http://localhost:5000/userOrders/${id}`;
    try {
      const { data } = await axios.delete(url, {
        headers: {
          authorization: `${user?.email} ${localStorage.getItem(
            "accessToken"
          )}`,
        },
      });
      // console.log(data);
      if (data) {
        setCancel(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>My orders :{orders?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price(usd)</th>
              <th>Cancel Order</th>
              <th>Shipping status</th>
              <th>Payment</th>
            </tr>
          </thead>
          {orders.map((order, index) => {
            return (
              <tbody key={order._id}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{order?.product}</td>
                  <td>{order?.orderQuantity}</td>
                  <td>{order?.totalPrice}</td>
                  <td>
                    {order.status === "pending" && (
                      <div>
                        <label
                          htmlFor="cancel-order"
                          className="btn btn-xs btn-warning modal-button"
                        >
                          Cancel
                        </label>
                        <input
                          type="checkbox"
                          id="cancel-order"
                          className="modal-toggle"
                        />
                        <div className="modal modal-bottom sm:modal-middle">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              Are you sure about canceling this order?
                            </h3>
                            <div className="modal-action">
                              <label
                                className="btn btn-md btn-error"
                                onClick={() => handleDelete(order?._id)}
                                htmlFor="cancel-order"
                              >
                                Yes
                              </label>
                              <label
                                htmlFor="cancel-order"
                                className="btn btn-md"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    {(order?.shipping === "shipped" && "shipped") ||
                      "Not Shipped"}
                  </td>
                  <td>
                    {order?.status === "pending" && (
                      <Link to={`/dashboard/payment/${order?._id}`}>
                        <button className="btn btn-xs btn-success">Pay</button>
                      </Link>
                    )}
                    {order?.status === "paid" && (
                      <div>
                        <p>
                          <span className="text-success">Paid</span>
                        </p>
                        <p>
                          Transaction id:{" "}
                          <span className="text-success text-sm">
                            {order?.transactionId}
                          </span>
                        </p>
                      </div>
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

export default MyOrders;
