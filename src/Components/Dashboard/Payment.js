import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CheckoutForm from "./CheckoutForm";
import { InfinitySpin } from "react-loader-spinner";

const stripePromise = loadStripe(
  "pk_test_51L0gtQCleCCJSf6N0qVeujBBIvuXiFVg1yxwXQdrOAXXpdKUo162kw118PF7rvgnWE49F14H702XyEkS3qYBYoSD004hIsjWXd"
);
const Payment = () => {
  const { id } = useParams();
  const url = `https://audiobee.onrender.com/userOrder/${id}`;
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(["ordering", id], () =>
    fetch(url, {
      method: "GET",
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
  return (
    <section className="">
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <h2 className="card-title font-bold text-success mx-auto">
            Order Details
          </h2>
          <p>Product name: {order?.product}</p>
          <p>Order quantity: {order?.orderQuantity}</p>
          <p>Total Price: {order?.totalPrice} (usd)</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
