import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cover from "../../Images/Banner/cover.jpg";
import cover1 from '../../Images/Banner/cover1.jpg';
import banner1 from '../../Images/Banner/banner1.jpg';

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
    lazyLoad: true,
    adaptiveHeight: true,
  };
  return (
    <section className="">
      <Slider {...settings}>
        <div>
          <img className="w-full" src={banner1} alt="" />
        </div>
        <div>
          <img className="w-full" src={cover1} alt="" />
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
