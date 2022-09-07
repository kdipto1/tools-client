import { useQuery } from "@tanstack/react-query";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
const HomeTools = () => {
  const { data: tools, isLoading } = useQuery(
    ["homeTools"],
    async () =>
      await fetch("https://audiobit.herokuapp.com/tools").then((res) =>
        res.json()
      )
  );
  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  return (
    <section id="products" className="mt-10 container mx-auto ">
      <h2 className="text-4xl font-bold text-center ">Products</h2>
      <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools?.map((tool) => (
          <div
            key={tool?._id}
            className="mx-auto card card-compact bg-base-200 shadow-lg"
          >
            <figure>
              <img className="w-full" src={tool?.image} alt="Graphics Cards" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{tool?.name}</h2>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {tool?.description?.slice(0, 90)}...
              </p>
              <p>
                <span className="font-medium">Price: </span>
                {tool?.price}$
              </p>
              <p>
                <span className="font-medium">Quantity: </span>
                {tool?.quantity}
              </p>
              <p>
                <span
                  data-tooltip="Minimum Order Quantity"
                  className="font-medium"
                >
                  <span>MOQ</span>:{" "}
                </span>
                {tool?.moq}
              </p>
              <div className="card-actions justify-end">
                <Link to={`/purchase/${tool._id}`} className="btn btn-primary">
                  Purchase &nbsp;{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeTools;
