import React from "react";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FcLikePlaceholder } from "react-icons/fc";
import CountUp from "react-countup";
const Summary = () => {
  return (
    <section className="mt-10">
      <h2 className="text-4xl font-bold text-center">Trusted By Our Buyers</h2>
      <div className="container text-center mt-16 gap-6 mx-auto grid-cols-2 grid lg:grid-cols-4">
        <div className="mx-auto">
          <FaFontAwesomeFlag className="text-7xl mx-auto" />
          <h1 className="font-bold text-4xl ">
            <CountUp end={72} />
          </h1>
          <p className="font-bold ">Countries</p>
        </div>
        <div className="mx-auto">
          <AiOutlineFundProjectionScreen className="text-7xl mx-auto" />
          <h1 className="font-bold text-4xl">
            <CountUp end={666} />+
          </h1>
          <p className="font-bold">Complete Project</p>
        </div>
        <div className="mx-auto">
          <BsPeople className="text-7xl mx-auto" />
          <h1 className="font-bold text-4xl">
            <CountUp end={1667} />+
          </h1>
          <p className="font-bold">Happy Clients</p>
        </div>
        <div className="mx-auto">
          <FcLikePlaceholder className="text-7xl mx-auto" />
          <h1 className="font-bold text-4xl">
            <CountUp end={422} />+
          </h1>
          <p className="font-bold">Feedback</p>
        </div>
      </div>
    </section>
  );
};

export default Summary;
