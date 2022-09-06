import React from "react";
import fast from "../../Images/Icons/fast.svg";
import stripe from "../../Images/Icons/stripe.svg";
import verified from "../../Images/Icons/verified.svg";
const HomeServices = () => {
  return (
    <section className="container mx-auto mt-10">
      <h2 className="font-bold text-center text-4xl my-6">Our Services</h2>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="card w-80 mx-auto card-compact bg-base-100 shadow-xl">
          <figure>
            <img src={verified} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title mx-auto">Verified products!</h2>
          </div>
        </div>
        {/*  */}
        <div className="card w-80 my-auto mx-auto card-compact bg-base-100 shadow-xl">
          <figure>
            <img className="" src={fast} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title mx-auto">Fast delivery!</h2>
          </div>
        </div>
        {/*  */}
        <div className="card w-80 mx-auto card-compact bg-base-100 shadow-xl">
          <figure>
            <img src={stripe} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title mx-auto">Secure payment with stripe!</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
