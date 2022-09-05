import React from "react";
import Banner from "./Banner";
import HomeReviews from "./HomeReviews";
import HomeTools from "./HomeTools";
import Summary from "./Summary";

const Home = () => {
  return (
    <main className="">
      <Banner />
      <HomeTools />
      <Summary />
      <HomeReviews />
    </main>
  );
};

export default Home;
