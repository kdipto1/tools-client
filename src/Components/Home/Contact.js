import React from "react";
import bgCool from "../../Images/Banner/bgcool.png";
const Contact = () => {
  return (
    <section className="container lg:p-11 mx-auto">
      <div className="card bg-gradient-to-r from-yellow-400 to-blue-500">
        <figure>
          <img src={"bgCool"} alt="" />
        </figure>
        <div className="card-body mx-auto">
          <h2 className="card-title inline-block text-center text-white text-4xl">
            Contact Us
          </h2>
          <form onClick={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <input
              type="text"
              placeholder="Your Email"
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <br />
            <textarea
              // cols={42}
              rows={5}
              className="textarea textarea-primary w-full max-w-xs"
              placeholder="Your Message"
            ></textarea>
            <br />
            <div className="text-center">
              <input
                className="btn btn-primary btn-wide mt-2 "
                type="submit"
                value="Send"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
