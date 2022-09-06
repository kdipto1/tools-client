import React from 'react';
import banner1 from '../../Images/Banner/banner1.jpg';
const Contact = () => {
  return (
    <section className="container mx-auto">
      <div className="card bg-base-100 shadow-xl image-full">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div className="card-body mx-auto">
          <h2 className="card-title inline-block text-center">Contact Us</h2>
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