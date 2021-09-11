import React from "react";
import Banners from "../Components/Home/Banners";
import HomeCategories from "../Components/Home/HomeCategories";
import HomeProductCarousel from "../Components/Home/HomeProductCarousel";

import "./Home.css";

function Home() {
  return (
    <div className="home-parent-div">
      <HomeCategories />
      <Banners />
      <HomeProductCarousel />
    </div>
  );
}

export default Home;
