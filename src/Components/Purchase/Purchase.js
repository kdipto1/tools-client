import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";

const Purchase = () => {
  const [user, loading, error] = useAuthState(auth);
  const params = useParams();
  let [tool, setTool] = useState({});
  // let moq = tool.moq;
  let [moqs, setMoqs] = useState(tool.moq);
  // console.log(moqs);
  let [moq1, setMoq] = useState();
  const [update, setUpdate] = useState();
  // console.log(moq1);

  useEffect(() => {
    const getTool = async () => {
      const url = `https://server-12-12.herokuapp.com/tools/${params.id}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        });
        await setTool(data);
        await setMoq(data.moq);
        await setMoqs(data.moq);
      } catch (error) {
        console.log(error);
      }
    };
    getTool();
  }, [params.id, update, user?.email]);

  const handleQuantity = () => {
    if (moq1 < moqs) {
      toast(`please order ${moqs} or more than ${moqs} piece`);
    }
    if (moq1 > tool?.quantity) {
      toast(`we dont have stock more than ${tool.quantity} piece`);
    }
  };
  const handlePurchase = async (event) => {
    event.preventDefault();
    const status = "pending";
    const product = tool?.name;
    const orderQuantity = event.target.minimum.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const address = event.target.address.value;
    const number = event.target.number.value;
    const totalPrice = parseInt(orderQuantity) * parseInt(tool.price);
    // console.log(orderQuantity, name, email, address, number, totalPrice);
    // const order = {
    //   orderQuantity: orderQuantity,
    //   name: name,
    //   address: address,
    //   number: number,
    //   totalPrice: totalPrice,
    //   status: status,
    // };
    await axios
      .post(
        "https://server-12-12.herokuapp.com/orders",
        {
          orderQuantity: orderQuantity,
          name: name,
          product: product,
          address: address,
          number: number,
          totalPrice: totalPrice,
          status: status,
          email: email,
        },
        {
          headers: {
            authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      )
      .then(function (response) {
        if (response) {
          toast("Order send");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
    let quantity = parseInt(tool.quantity) - parseInt(orderQuantity);
    console.log(quantity);
    try {
      const { data } = await axios.put(
        `https://server-12-12.herokuapp.com/tool/${tool?._id}`,
        {
          quantity: quantity,
        },
        {
          headers: {
            authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      );
      if (data) {
        setUpdate(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container mx-auto">
      <div className="card lg:card-side bg-base-100 mx-auto lg:w-4/6 shadow-xl mt-6">
        <figure>
          <img src={tool?.image} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{tool?.name}</h2>
          <p>{tool?.description}</p>
          <p>Price: {tool?.price}</p>
          <p>Quantity: {tool?.quantity}</p>
          <p>Minimum order quantity: {tool?.moq}</p>
        </div>
      </div>
      <div className="card lg:w-2/4 bg-base-100 shadow-xl mx-auto mt-8">
        <div className="card-body">
          <h2 className="card-title mx-auto">Purchase</h2>
          <form className="flex flex-col mx-auto" onSubmit={handlePurchase}>
            <label className="mx-auto">Quantity:</label>
            <input
              onInput={(e) => setMoq(e.target.value)}
              onBeforeInput={handleQuantity}
              onBlur={handleQuantity}
              onClick={handleQuantity}
              onChange={handleQuantity}
              onFocus={handleQuantity}
              name="minimum"
              // id="moq"
              value={moq1}
              type="number"
              placeholder="quantity"
              className="input input-bordered input-accent mx-auto mb-4 w-28"
            />
            <input
              disabled
              defaultValue={user?.email}
              name="email"
              type="text"
              placeholder="Type here"
              className="input input-bordered input-accent w-64 mb-4 max-w-xs"
            />
            <input
              required
              type="text"
              name="name"
              defaultValue={user?.name || ""}
              placeholder="Your Name"
              className="input input-bordered input-accent w-64 mb-4 max-w-xs"
            />
            <input
              required
              name="address"
              type="text"
              placeholder="Your Address"
              className="input input-bordered input-accent w-64 mb-4 max-w-xs"
            />
            <input
              required
              type="number"
              name="number"
              placeholder="your Phone Number"
              className="input input-bordered input-accent mb-4 w-64 max-w-xs"
            />
            <input
              disabled={moq1 < moqs || moq1 > tool?.quantity}
              type="submit"
              value="Order"
              className="btn btn-accent"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Purchase;
