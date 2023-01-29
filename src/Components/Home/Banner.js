import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../../Images/Banner/banner.png";
import banner1 from "../../Images/Banner/banner1.png";
import { Link } from "react-router-dom";
import { BsCaretDownSquareFill } from "react-icons/bs";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    fade: true,
    arrows: false,
  };
  return (
    <section className="">
      <Slider {...settings}>
        <div className="">
          <div
            style={{
              backgroundImage: `url(${banner})`,
            }}
            className="hero-overlay hero  "
          >
            <div
              style={{ height: "85vh" }}
              className="hero-content  text-center text-neutral-content"
            >
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-white">
                  Best Audio Accessories You Can Get
                </h1>
                <button
                  onClick={() => window.scrollTo(0, 800)}
                  className="text-4xl text-white"
                >
                  <BsCaretDownSquareFill />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="h-4/5">
          <div
            style={{
              backgroundImage: `url(${banner1})`,
            }}
            className="hero-overlay hero h-4/5 bg-opacity-60"
          >
            <div
              style={{ height: "85vh" }}
              className="hero-content text-center text-neutral-content"
            >
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-white">
                  Best Audio Accessories You Can Get
                </h1>
                <button
                  onClick={() => window.scrollTo(0, 800)}
                  className="text-4xl text-white"
                >
                  <BsCaretDownSquareFill />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
