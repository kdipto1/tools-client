import React from "react";
import Banner from "./Banner";
import Contact from "./Contact";
import HomeReviews from "./HomeReviews";
import HomeServices from "./HomeServices";
import HomeTools from "./HomeTools";
import ReviewScroll from "./ReviewScroll";
import Summary from "./Summary";

const Home = () => {
  return (
    <main className="">
      <Banner />
      <HomeTools />
      <HomeServices/>
      <Summary />
      <HomeReviews />
      {/* <ReviewScroll/> */}
      <Contact/>
    </main>
  );
};

export default Home;
