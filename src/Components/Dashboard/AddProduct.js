import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    let name = event?.target.name.value;
    let description = event?.target.description.value;
    let image = event?.target.image.value;
    let moq = parseInt(event?.target.moq.value);
    let quantity = parseInt(event?.target.quantity.value);
    let price = parseInt(event?.target.price.value);
    console.log(name, image, description, moq, quantity, price);
    const product = {
      name: name,
      image: image,
      description: description,
      moq: moq,
      quantity: quantity,
      price: price,
    };
    const url = "https://audiobit.herokuapp.com/tools";
    try {
      const { data } = await axios.post(url, product, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (data) {
        toast.success("Product added");
        event.target.name.value = "";
        event.target.description.value = "";
        event.target.image.value = "";
        event.target.moq.value = "";
        event.target.quantity.value = "";
        event.target.price.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container">
      <div className="card w-96 bg-base-100 mx-auto mt-10 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              required
              name="name"
              type="text"
              placeholder="Product Name"
              className="input input-bordered input-success w-full max-w-xs"
            />
            <input
              required
              name="description"
              type="text"
              placeholder="Product Description"
              className="my-2 input input-bordered input-success w-full max-w-xs"
            />
            <input
              required
              name="image"
              type="text"
              placeholder="product Image Link"
              className="input input-bordered input-success w-full max-w-xs"
            />
            <input
              required
              name="moq"
              type="number"
              placeholder="Minimum Order Quantity"
              className="my-2 input input-bordered input-success w-full max-w-xs"
            />
            <input
              required
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="mb-2 input input-bordered input-success w-full max-w-xs"
            />
            <input
              required
              name="price"
              type="number"
              placeholder="Price"
              className="mb-2 input input-bordered input-success w-full max-w-xs"
            />
            <div className="card-actions justify-end">
              <input
                className="btn btn-success"
                type="submit"
                value="Add Product"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
