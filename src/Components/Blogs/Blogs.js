import { useQuery } from "@tanstack/react-query";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Blogs = () => {
  const { data: blogs, isLoading } = useQuery(
    ["blogs"],
    async () =>
      await fetch("https://tools-server-production.up.railway.app/blogs").then(
        (res) => res.json()
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
    <section className="container mx-auto mt-10">
      <h2 className="font-bold text-4xl text-center">Blogs</h2>
      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img className="h-48" src={blog?.image} alt="blog images" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog?.name}</h2>
              <p>{blog?.description.slice(0, 250)}...</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Full Article</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
