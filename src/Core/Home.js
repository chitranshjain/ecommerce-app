import React, { useEffect } from "react";
import Banners from "../Components/Home/Banners";
import HomeCategories from "../Components/Home/HomeCategories";
import HomeProductCarousel from "../Components/Home/HomeProductCarousel";
import $ from "jquery";

import "./Home.css";

function Home() {
  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);

  return (
    <div className="home-parent-div">
      <HomeCategories />
      <Banners />
      <HomeProductCarousel />
    </div>
  );
}

export default Home;
