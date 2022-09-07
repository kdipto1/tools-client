import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";

const ManageProducts = () => {
  const {
    data: tools,
    isLoading,
    refetch,
  } = useQuery(
    ["manageProducts"],
    async () =>
      await fetch("https://audiobit.herokuapp.com/manageTools", {
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
  const handleProductDelete = async (id) => {
    const url = `https://audiobit.herokuapp.com/tools/${id}`;
    try {
      const { data } = await axios.delete(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (data) {
        toast("Product deleted");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h2>Manage products:{tools?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Product Id</th>
              <th>Delete product</th>
            </tr>
          </thead>
          {tools.map((tool, index) => {
            return (
              <tbody key={tool?._id}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{tool?.name}</td>
                  <td>{tool?._id}</td>
                  <td>
                    <div>
                      <label
                        htmlFor="manage-product-modal"
                        className="btn btn-xs modal-button"
                      >
                        Delete
                      </label>

                      <input
                        type="checkbox"
                        id="manage-product-modal"
                        className="modal-toggle"
                      />
                      <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            Are you sure about deleting this product?
                          </h3>
                          <div className="modal-action">
                            <label
                              onClick={() => handleProductDelete(tool?._id)}
                              htmlFor="manage-product-modal"
                              className="btn btn-md"
                            >
                              Yes
                            </label>
                            <label
                              htmlFor="manage-product-modal"
                              className="btn btn-md"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ManageProducts;
