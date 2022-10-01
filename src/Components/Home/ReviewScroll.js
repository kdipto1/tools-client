import React, { useContext } from "react";
import RightArrowIcon from "../../Images/Icons/right-arrow.png";
import LeftArrowIcon from "../../Images/Icons/left-arrow.png";
import { FaUserAlt } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
const ReviewScroll = () => {
  const { data: reviews, isLoading } = useQuery(
    ["homeReviews"],
    async () =>
      await fetch("https://audiobee.onrender.com/review").then((res) =>
        res.json()
      )
  );
  if (isLoading) {
    return;
  }
  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
      <button onClick={() => scrollPrev()} className="right-arrow">
        <img src={LeftArrowIcon} alt="right-arrow" />
      </button>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return (
      <button onClick={() => scrollNext()} className="left-arrow">
        <img src={RightArrowIcon} alt="right-arrow" />
      </button>
    );
  };

  return (
    <section className=" my-16 bg-white">
      <ScrollMenu
        className="container"
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
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
      </ScrollMenu>
    </section>
  );
};

export default ReviewScroll;
