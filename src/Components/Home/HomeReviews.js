import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import Slider from "react-slick";
const HomeReviews = () => {
  const { data: reviews, isLoading } = useQuery(
    ["homeReviews"],
    async () =>
      await fetch("http://localhost:5000/review").then((res) => res.json())
  );
  if (isLoading) {
    return;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <section className="mt-16 pb-10 container mx-auto">
      <h2 className="mb-4 text-center font-bold text-4xl text-blue-400">
        Buyer Reviews
      </h2>
      <Slider {...settings}>
        {reviews.map((review) => {
          return (
            <div key={review._id} className="card w-60 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-center">
                  <h2 className="text-2xl text-cyan-400">
                    <FaUserAlt />
                  </h2>
                </div>
                <h2 className="card-title">{review?.name}</h2>
                <p>{review?.comment}</p>
                <p>Ratting: {review?.ratting}/5</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default HomeReviews;
