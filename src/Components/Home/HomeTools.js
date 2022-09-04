import { useQuery } from "@tanstack/react-query";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
const HomeTools = () => {
  const { data: tools, isLoading } = useQuery(["homeTools"], () =>
    fetch("http://localhost:5000/tools").then((res) => res.json())
  );
  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  return (
    <section className="mt-10 container mx-auto">
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
                <span className="font-medium">MOQ: </span>
                {tool?.moq}
              </p>
              <div className="card-actions justify-end">
                <Link to={`/purchase/${tool._id}`} className="btn btn-primary">
                  Purchase &nbsp;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link to="/manageInventory" className="btn btn-primary btn-wide ">
          Manage Inventory
        </Link>
      </div>
    </section>
  );
};

export default HomeTools;
